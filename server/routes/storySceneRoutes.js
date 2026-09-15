import express from "express";

import {
    addStoryScene,
    getStoryScene,
    deleteStoryScene
} from "../controllers/storySceneController.js";

import {
    validateCreateStoryScene,
    validateGetStoryScene
} from "../middleware/storySceneMiddleware.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateCreateStoryScene, addStoryScene);

router.get("/", validateGetStoryScene, getStoryScene);

router.delete("/:storyId/:sceneId", deleteStoryScene);

export default router;