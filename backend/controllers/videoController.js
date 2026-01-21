import Video from "../models/Video";
import Channel from "../models/Channel";

export const uploadVideo=async(req,res)=>{
    try{
        const {title,description,thumbnailUrl,videoUrl,channelId}=req.body
        const uploader=req.user.id;

        const newvideo=new Video({
            title,
            description,
            thumbnailUrl,
            videoUrl,
            channelId,
            uploader
        })

        await newvideo.save();

        await Channel.findByIdAndUpdate(channelId,{
            $push:{videos:newvideo._id}
        });

        res.json({message:"video uploaded successfully",video:newvideo});
    }
    catch(err)
    {
        res.status(500).json({err:err.message});
    }
}


export const getVideoByChannel=async(req,res)=>{
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