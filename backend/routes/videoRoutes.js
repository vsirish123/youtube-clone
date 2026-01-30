import express from "express";
import {protect} from "../middleware/authMiddleware.js";
import { getAllVideos,uploadVideo,getVideoById,editVideo,deleteVideo } from "../controllers/videoController.js";

const router=express.Router();
router.get("/", getAllVideos);
router.get("/:id",getVideoById);
router.post("/",protect,uploadVideo);
router.put("/:id",protect,editVideo);
router.delete("/:id",protect,deleteVideo);

export default router;