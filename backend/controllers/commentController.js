import Comment from "../models/Comment.js"

export const addComment=async(req,res)=>
{
    try{
        const {videoId}=req.params;
        const {text}=req.body;
        const userId=req.user.id;

        if (!text.trim()) {
        return res.status(400).json({ message: "Comment cannot be empty" });
        }

        const comment = await Comment.create({ videoId, userId, text });
        const populatedComment = await comment.populate("userId", "username");
        res.status(201).json({message: "Comment added",comment: populatedComment,
    });
    }
    catch(err)
    {
        res.status.json({err:err.message})
    }
}

export const getComments=async(req,res)=>{
    try{
        const {videoId}=req.params;

        const comments = await Comment.find({ videoId })
        .populate("userId", "username")
        .sort({ createdAt: -1 });

        res.status(200).json({ comments });
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
        const { text } = req.body;
        const comment=await Comment.findById(commentId);

        if(!comment)
        {
            return res.json({message:"comment not found"});
        }
         if (comment.userId.toString() !== userId)
            return res.status(403).json({ message: "Unauthorized" });

        comment.text = text;
        await comment.save();

        const updated = await comment.populate("userId", "username");

        res.json({
        message: "Comment updated",
        comment: updated,
        });
    }
    catch(err)
    {
        res.json({err:err.message});

    }
}

export const deleteComment=async(req,res)=>{
    try{
        const {commentId}=req.params;
        const userId=req.user.id;

        const comment=await Comment.findById(commentId);

        if(!comment)
        {
            return res.json({message:"comment not found"});
        }
        
        if (comment.userId.toString() !== userId)
            return res.status(403).json({ message: "Unauthorized" });

        await comment.deleteOne();

        res.json({ message: "Comment deleted" });
    }
    catch(err)
    {
        res.json({err:err.message});

    }
}
