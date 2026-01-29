import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import { getAllVideos,uploadVideo,getVideosByChannel,getVideoById,editVideo,deleteVideo,likeVideo,dislikeVideo } from "../controllers/videoController.js";

const router=express.Router();
router.get("/", getAllVideos);
router.post("/upload",protect,uploadVideo);
router.get("/channel/:channelId",getVideosByChannel);
router.get("/:id",getVideoById);
router.put("/:id/like", protect, likeVideo);
router.put("/:id/dislike", protect, dislikeVideo);
router.put("/:id",protect,editVideo);
router.delete("/:id",protect,deleteVideo);

export default router;