import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

export const createChannel=async(req,res)=>{
    try{
        const {channelName,description,channelBanner}=req.body;

        const owner=req.user.id;

        const existingChannel=await Channel.findOne({owner})

        if(existingChannel)
        {
            return res.status(400).json({message:"channel already exists for the user"});
        }

        const newChannel=new Channel(
            {
                channelName,
                description,
                channelBanner,
                owner
            }
        );

        await newChannel.save();
        res.json({message:"channel created successfully",channel:newChannel})
    }
    catch(err)
    {
        res.status(500).json({err:err.message})
    }
}

export const getChannelById=async(req,res)=>{
    try{
        const {id}=req.params;

        const channel=await Channel.findById(id);

        if(!channel)
        {
            return res.status(404).json({message:"channel not found"})
        }

        const videos=await Video.find({channelId:id});

        res.json({
            channel,
            videos
        })
    }
    catch(err)
    {
        res.json.status(500).json({err:err.message})
    }
}