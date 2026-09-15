import express from "express";

import {
    addCharacterPower,
    getCharactersPowers,
    deleteCharacterPower
} from "../controllers/charPowerController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

// Story → Character → Power
router.post("/", addCharacterPower);
router.get("/", getCharactersPowers);
router.delete("/:storyId/:characterId/:powerId", deleteCharacterPower);

export default router;