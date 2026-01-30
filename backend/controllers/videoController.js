import Video from "../models/Video.js";
import Channel from "../models/Channel.js";


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
        const video=new Video.create({
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


export const getVideosByChannel=async(req,res)=>{
    try{
        const {channelId}=req.params;
        const videos=await Video.find({channelId});
        res.json(videos);
    }
    catch(err)
    {
        res.status(500).json({err:err.message});
    }
}

export const getVideoById=async(req,res)=>{
    try{
        const video=await Video.findById(req.params.id);

        if(!video)
        {
            return res.json({message:"video not found"});
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

export const likeVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { likes: 1 } },
      { new: true }
    ).populate("channel", "channelName");

    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Like failed" });
  }
};

export const dislikeVideo = async (req, res) => {
  try {
    const video = await Video.findByIdAndUpdate(
      req.params.id,
      { $inc: { dislikes: 1 } },
      { new: true }
    ).populate("channel", "channelName");

    res.json(video);
  } catch (err) {
    res.status(500).json({ message: "Dislike failed" });
  }
};
