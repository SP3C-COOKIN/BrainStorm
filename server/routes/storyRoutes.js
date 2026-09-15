import express from "express";
import {
  createStory,
  getStory,
  getStories,
  editStory,
  deleteStory
} from "../controllers/storyController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { createStoryMiddleware, updateStoryMiddleware } from "../middleware/storyMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/worlds/:worldId/stories", createStoryMiddleware, createStory);
router.get("/worlds/:worldId/stories", getStories);
router.get("/worlds/:worldId/stories/:id", getStory);
router.patch("/worlds/:worldId/stories/:id", updateStoryMiddleware, editStory);
router.delete("/worlds/:worldId/stories/:id", deleteStory);

export default router;