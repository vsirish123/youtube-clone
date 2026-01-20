import express from "express";
import { createChannel,getChannelById } from "../controllers/channelController";
import {protect} from "../middleware/authMiddleware"

const router=express.Router();

router.post("/create",protect,createChannel);
router.post("/:id",getChannelById);

export default router;