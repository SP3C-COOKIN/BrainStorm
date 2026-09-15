import express from "express";

import {
    addStoryPower,
    getStoryPower,
    deleteStoryPower
} from "../controllers/storyPowerController.js";

import {
    validateCreateStoryPower,
    validateGetStoryPower
} from "../middleware/storyPowerMiddleware.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateCreateStoryPower, addStoryPower);

router.get("/", validateGetStoryPower, getStoryPower);

router.delete("/:storyId/:powerId", deleteStoryPower);

export default router;