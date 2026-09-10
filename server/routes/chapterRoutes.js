import express from "express";

import {
    createChapter,
    getChapter,
    getChapters,
    editChapter,
    deleteChapter
} from "../controllers/chapterController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { createChapterMiddleware, updateChapterMiddleware } from "../middleware/chapterMiddleware.js"

const router = express.Router();

router.post("/worlds/:worldId/stories/:storyId", authMiddleware, createChapterMiddleware, createChapter);
router.get("/worlds/:worldId/stories/:storyId/chapter/:chapterId", authMiddleware, getChapter);
router.get("/worlds/:worldId/story/:storyId/chapter", authMiddleware, getChapters);
router.patch("worlds/:worldId/story/:storyId/chapter/:chapterId", authMiddleware, updateChapterMiddleware, editChapter);
router.delete("worlds/:worldId/story/:storyId/chapter/:chapterId", authMiddleware, deleteChapter);

export default router; 