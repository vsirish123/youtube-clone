import express from "express";
import {
  addComment,
  getComments,
  editComment,
  deleteComment,
} from "../controllers/commentController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/:videoId", protect, addComment);
router.get("/:videoId", getComments);
router.put("/edit/:commentId", protect, editComment);
router.delete("/delete/:commentId", protect, deleteComment);

export default router;
