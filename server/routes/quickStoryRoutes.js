import express from 'express';

import {
    createQuickStoryController,
    getQuickStoriesController,
    deleteQuickStoryController
} from "../controllers/quickStoryController.js"

import { authMiddleware } from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(authMiddleware);

router.post("/:quickCaptureId/scene/:storyId", createQuickStoryController);
router.get("/:quickCaptureId", getQuickStoriesController);
router.delete("/:quickCaptureId/scene/:storyId", deleteQuickStoryController)

export default router;