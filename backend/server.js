import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import commentRoutes from "./routes/commentRoutes.js";

const app=express();
app.use(cors({
  origin: "http://localhost:5173",
}));

app.use(express.json());

mongoose.connect("mongodb://localhost:27017/users-data").then(()=>console.log("Mongodb connected"));

app.use("/api/auth",authRoutes);
app.use("/api/channels",channelRoutes);
app.use("/api/videos",videoRoutes);
app.use("/api/comments",commentRoutes);

app.get("/",(req,res)=>{
    res.send("youtube clone Backend Running...");
})

app.listen(5002,()=>console.log("server running at 5002"));