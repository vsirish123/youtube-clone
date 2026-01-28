import Video from "../models/Video.js";
import Channel from "../models/Channel.js";

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

export const editVideo=async(req,res)=>{
    try{
        const {id}=req.params;
        const uploader=req.user.id;
        const video=await Video.findById(id);
        if(!video)
        {
            return res.json({message:"video not found"});
        }

        if(user.uploader!=uploader)
        {
            return res.json({message:"unauthorized"});
        }

        const updatedVideo=await Video.findByIdAndUpdate(id,req.body,{new:true});

        res.json({message:"video updated",video:updatedVideo});
        
    }
    catch(err)
    {
        res.status(500).json({err:err.message});
    }

}

export const deleteVideo=async(req,res)=>{
    try{
        const {id}=req.params;
        const uploader=req.user.id;
        const video=await Video.findById(id);
        if(!video)
        {
            return res.json({message:"video not found"});
        }

        if(user.uploader!=uploader)
        {
            return res.json({message:"unauthorized"});
        }
        await Video.findByIdAndDelete(id);

        await Channel.findByIdAndUpdate(video.channelId,{$pull:{videos:id}});

        res.json({message:"video deleted"});
    }
    catch(err)
    {
        res.status(500).json({err:err.message});
    }
}