import express from "express";
import { addComment,getComments,editComment,deleteComment } from "../controllers/commentController";
import {protect} from "../middleware/authMiddleware"

const router=express.Router();

router.post("/:videoId",protect,addComment);
router.get("/:videoId",getComments);
router.edit("/edit/:commentId",protect,editComment);
router.delete("/delete/:commentId",protect,deleteComment);

export default router;