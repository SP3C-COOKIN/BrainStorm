import express from "express";
import {
  createChapter,
  getChapter,
  getChapters,
  editChapter,
  deleteChapter
} from "../controllers/chapterController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createChapterMiddleware, updateChapterMiddleware } from "../middleware/chapterMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Story-scoped
router.post("/worlds/:worldId/stories/:storyId/chapters", createChapterMiddleware, createChapter);
router.get("/worlds/:worldId/stories/:storyId/chapters", getChapters);

// Chapter ID-scoped
router.get("/worlds/:worldId/stories/:storyId/chapters/:chapterId", getChapter);
router.patch("/worlds/:worldId/stories/:storyId/chapters/:chapterId", updateChapterMiddleware, editChapter);
router.delete("/worlds/:worldId/stories/:storyId/chapters/:chapterId", deleteChapter);

export default router;