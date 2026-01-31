import mongoose from "mongoose";

const videoSchema=new mongoose.Schema(
    {
        title:String,
        description:String,
        thumnailUrl:String,
        videoUrl:String,
        channel: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Channel",
            required: true,
        },
        category: {
            type: String,
            enum: ["Music", "Gaming", "Sports", "Technology"],
            required:true
        },
        views:{type:Number,default:0},
        likes:{type:Number,default:0},
        dislikes:{type:Number,default:0},
        likedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        dislikedBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

    },
    {timestamps:true}

)

export default mongoose.model("Video",videoSchema);