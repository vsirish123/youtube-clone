import Channel from "../models/Channel.js";
import Video from "../models/Video.js";

// creating channel
export const createChannel=async(req,res)=>{
    try{
        const {channelName,description,channelBanner}=req.body;
        if(!channelName)
        {
            return res.status(404).json({message:"channel name is required"})
        }
        const owner=req.user.id;

        const existingChannel=await Channel.findOne({owner})

        if(existingChannel)
        {
            return res.status(400).json({message:"channel already exists for the user"});
        }

        const newChannel=await Channel.create(
            {
                channelName,
                description,
                channelBanner,
                owner
            }
        );
        res.status(201).json({message:"channel created successfully",channel:newChannel});
    }
    catch(err)
    {
        res.status(500).json({err:err.message})
    }
}
// getting channel by id
export const getChannelById=async(req,res)=>{
    try{

        const channel=await Channel.findById(req.params.id);

        if(!channel)
        {
            return res.status(404).json({message:"channel not found"})
        }

        const videos=await Video.find({channel:channel._id});

        res.json({
            channel,
            videos
        })
    }
    catch(err)
    {
        res.status(500).json({err:err.message})
    }
}
//getting our channel
export const getMyChannel = async (req, res) => {
  try {
    const channel = await Channel.findOne({ owner: req.user.id });

    if (!channel) {
      return res.status(404).json({ message: "No channel found" });
    }

    res.json({ channel });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
