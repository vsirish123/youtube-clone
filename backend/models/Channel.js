
import mongoose from "mongoose";

const channelSchema=new mongoose.Schema(
    {
        channelName:{type:String,required:true},
        owner:{type:String,required:true},
        description:{type:String,default:""},
        channelBanner:{type:String,default:""},
        subscribers:{type:Number,default:0},
        videos:{type:[String],default:[]},
    },
    {timestamps:true}
)

export default mongoose.model("Channel",channelSchema);