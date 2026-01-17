import express from "express";
import cors from "cors";

const app=express();
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
    res.send("youtube clone Backend Running...");
})

app.listen(5002,()=>console.log("server running at 5002"));