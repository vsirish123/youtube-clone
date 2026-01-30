import Video from "../models/Video.js";
import mongoose from "mongoose";


export const getAllVideos = async (req, res) => {
  try {
    const videos = await Video.find().populate("channel","channelName");
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};


export const uploadVideo=async(req,res)=>{
    try{
        const {title,description,thumbnailUrl,videoUrl,category,channelId}=req.body
        if(!title||!videoUrl||!thumbnailUrl||!category){
            return res.status(400).json({message:"All fields are required"});
        }
        const video=Video.create({
            title,
            description,
            thumbnailUrl,
            videoUrl,
            category,
            channel:channelId,
            user:req.user._id
        })

        res.status(201).json(video);
    }
    catch(err)
    {
        res.status(500).json({err:err.message});
    }
}


export const getVideoById=async(req,res)=>{
    try{
        const {id}=req.params;
        if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(400).json({message:"Invalid ID"});
        }
        const video=await Video.findById(id).populate("channel","channelName owner");

        if(!video)
        {
            return res.status(404).json({message:"video not found"});
        }

        res.json(video);
    }
    catch(err)
    {
        res.status(500).json({err:err.message});
    }
}
export const editVideo = async (req, res) => {
  try {
    if (!req.user || !req.user._id) {
      return res.status(401).json({ message: "Unauthorized (no user)" });
    }

    const video = await Video.findById(req.params.id);
    if (!video) {
      return res.status(404).json({ message: "Video not found" });
    }

    // Auto-assign owner if missing
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

    // Auto-assign owner for legacy videos
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
