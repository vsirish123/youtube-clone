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
            return res.json({message:"comment not found"});
        }
        
        if(comment.userId!=userId)
        {
            return res.json({message:"unauthorised"});
        }

        const updated=await comment.findByIdAndUpdate(
            commentId,
            {text:req.body.text},
            {new :true}
        )
        
        res.json({message:"updated comment",comment:updated})
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
        
        if(comment.userId!=userId)
        {
            return res.json({message:"unauthorised"});
        }

        const updated=await comment.findByIdAndDelete(commentId);
        
        res.json({message:"comment deleted"})
    }
    catch(err)
    {
        res.json({err:err.message});

    }
}
