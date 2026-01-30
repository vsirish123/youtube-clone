import express from "express";
import { createChannel,getChannelById,getMyChannel } from "../controllers/channelController.js";
import {protect} from "../middleware/authMiddleware.js"

const router=express.Router();

router.post("/create",protect,createChannel);
router.get("/my-channel",getMyChannel)
router.post("/:id",getChannelById);

export default router;