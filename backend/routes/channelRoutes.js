import express from "express";
import { createChannel,getChannelById } from "../controllers/channelController.js";
import {protect} from "../middleware/authMiddleware.js"

const router=express.Router();

router.post("/create",protect,createChannel);
router.post("/:id",getChannelById);

export default router;