import mongoose from "mongoose";

const videoSchema=new mongoose.Schema(
    {
        title:{type:String,required:true},
        description:{type:String,default:""},
        thumnailUrl:{type:String,required:true},
        videoUrl:{type:String,required:true},
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
        dislikes:{type:Number,default:0}
    },
    {timestamps:true}

)

export default mongoose.model("Video",videoSchema);