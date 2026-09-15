import express from "express";

import {
    addStoryCharacter,
    getStoryCharacter,
    deleteStoryCharacter
} from "../controllers/storyCharacterController.js";

import {
    validateCreateStoryCharacter,
    validateGetStoryCharacter
} from "../middleware/charStoryMiddleware.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateCreateStoryCharacter, addStoryCharacter);

router.get("/", validateGetStoryCharacter, getStoryCharacter);

router.delete("/:storyId/:characterId", deleteStoryCharacter);

export default router;