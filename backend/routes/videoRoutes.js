import express from "express";
import {protect} from "../middleware/authMiddleware";
import { uploadVideo,getVideosByChannel,getVideoById,editVideo,deleteVideo } from "../controllers/videoController";

const router=express.Router();

router.post("/upload",protect,uploadVideo);
router.get("/channel/:channelId",getVideosByChannel);
router.get("/:id",getVideoById);
router.put("/:id",protect,editVideo);
router.delete("/:id",protect,deleteVideo);

export default router;