import Comment from "../models/Comment";

export const addComment=async(req,res)=>
{
    try{
        const {videoId}=req.params;
        const {text}=req.body;
        const userId=req.user.id;

        const newComment=new Comment({
            videoId,
            userId,
            text
        });

        await newComment.save();

        res.json({message:"comment added successfully",comment:newComment});


    }
    catch(err)
    {
        res.status.json({err:err.message})
    }
}

export const getComments=async(req,res)=>{
    try{
        const {videoId}=req.params;
        const comments=(await Comment.find({videoId})).sort({createdAt:-1});
        res.json(comments);
    }
    catch(err)
    {
        res.status(500).json({err:err.message})
    }
}

export const editComment=async(req,res)=>{
    try{
        const {commentId}=req.params;
        const userId=req.user.id;

        const comment=await Comment.findById(commentId);

        if(!comment)
        {
            return res.json("comment not found");
        }
        
    }
}