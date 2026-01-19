import Channel from "../models/Channel";
import Video from "../models/Video";

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