import express from "express";

import{
    createStory,
    getStory,
    getStories,
    editStory,
    deleteStory
} from "../controllers/storyController.js"; 

import { authMiddleware } from "../middleware/authMiddleware.js"
import { createStoryMiddleware, updateStoryMiddleware} from "../middleware/storyMiddleware.js"

const router = express.Router()

router.post("/worlds/:worldId/stories", authMiddleware, createStoryMiddleware, createStory);
router.get("/worlds/:worldId/stories", authMiddleware, getStories);
router.get("/worlds/:worldId/stories/:id", authMiddleware, getStory);
router.patch("/worlds/:worldId/stories/:id", authMiddleware, updateStoryMiddleware, editStory);
router.delete("/worlds/:worldId/stories/:id", authMiddleware, deleteStory);

export default router;