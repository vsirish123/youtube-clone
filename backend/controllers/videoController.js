import Video from "../models/Video.js";
import mongoose from "mongoose";


// ===============================
// GET ALL VIDEOS (HOME)
// ===============================
export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find()
      .populate("channel", "channelName");

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


// ===============================
// UPLOAD VIDEO (OWNER ONLY)
export const uploadVideo = async (req, res) => {
  try {
    const { title, description, videoUrl, thumbnailUrl, category, channelId } =
      req.body;

    if (!title || !videoUrl || !thumbnailUrl || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const video = await Video.create({
      title,
      description,
      videoUrl,
      thumbnailUrl,
      category,
      channel: channelId,
      user: req.user._id, // NOW req.user EXISTS
    });

    res.status(201).json(video);
  } catch (error) {
    console.error("UPLOAD VIDEO ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// ===============================
// GET SINGLE VIDEO
// ===============================
export const getVideoById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: "Invalid ID" });
  }

  const video = await Video.findById(id)
    .populate("channel", "channelName owner");

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  res.json(video);
};

// ===============================
// EDIT VIDEO (OWNER ONLY)
// ===============================
export const editVideo = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized (no user)" });
    }

    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    //  Auto-assign owner if missing
    if (!video.user) {
      video.user = req.user._id;
    }

    if (String(video.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, description, videoUrl, thumbnailUrl, category } = req.body;

    video.title = title ?? video.title;
    video.description = description ?? video.description;
    video.videoUrl = videoUrl ?? video.videoUrl;
    video.thumbnailUrl = thumbnailUrl ?? video.thumbnailUrl;
    video.category = category ?? video.category;

    await video.save();
    res.json(video);
  } catch (error) {
    console.error("EDIT VIDEO ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ===============================
// DELETE VIDEO (OWNER ONLY)
// ===============================
export const deleteVideo = async (req, res) => {
  try {
    // HARD GUARD
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    //  Auto-assign owner for legacy videos
    if (!video.user) {
      video.user = req.user._id;
      await video.save();
    }
    //  Ownership check (SAFE)
    if (String(video.user) !== String(req.user._id)) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await video.deleteOne();

    res.json({ message: "Video deleted successfully" });
  } catch (error) {
    console.error("DELETE VIDEO ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

export const likeVideo = async (req, res) => {
  try {
    const userId = req.user.id;
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // init
    video.likedBy ||= [];
    video.dislikedBy ||= [];

    // already liked → do nothing
    if (video.likedBy.includes(userId)) {
      return res.status(400).json({ message: "Already liked" });
    }

    // remove dislike FIRST
    if (video.dislikedBy.includes(userId)) {
      video.dislikedBy = video.dislikedBy.filter(
        (id) => id.toString() !== userId
      );
    }

    // add like
    video.likedBy.push(userId);

    // derive counts from arrays (KEY FIX)
    video.likes = video.likedBy.length;
    video.dislikes = video.dislikedBy.length;

    await video.save();

    const populatedVideo = await Video.findById(video._id)
      .populate("channel", "channelName");

    res.json(populatedVideo);
  } catch (err) {
    console.error("LIKE ERROR:", err);
    res.status(500).json({ message: "Like failed" });
  }
};
export const dislikeVideo = async (req, res) => {
  try {
    const userId = req.user.id;
    const video = await Video.findById(req.params.id);

    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    video.likedBy ||= [];
    video.dislikedBy ||= [];

    if (video.dislikedBy.includes(userId)) {
      return res.status(400).json({ message: "Already disliked" });
    }

    if (video.likedBy.includes(userId)) {
      video.likedBy = video.likedBy.filter(
        (id) => id.toString() !== userId
      );
    }

    video.dislikedBy.push(userId);

    // derive counts safely
    video.likes = video.likedBy.length;
    video.dislikes = video.dislikedBy.length;

    await video.save();

    const populatedVideo = await Video.findById(video._id)
      .populate("channel", "channelName");

    res.json(populatedVideo);
  } catch (err) {
    console.error("DISLIKE ERROR:", err);
    res.status(500).json({ message: "Dislike failed" });
  }
};

