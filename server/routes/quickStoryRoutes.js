import express from 'express';

import {
    createQuickStoryController,
    getQuickStoriesController,
    deleteQuickStoryController
} from "../controllers/quickStoryController.js"

import { authMiddleware } from '../middleware/authMiddleware.js';

import {quickStoryMiddleware} from "../middleware/quickStoryMiddleware.js"

const router = express.Router();

router.use(authMiddleware);

router.post("/:quickCaptureId/scene/:sceneId", quickStoryMiddleware, createQuickStoryController);
router.get("/:quickCaptureId", getQuickStoriesController);
router.delete("/:quickCaptureId/scene/:sceneId", deleteQuickStoryController)

export default router;