import express from "express";
import {
    addCharacterPower,
    getCharactersPowers,
    deleteCharacterPower
} from "../controllers/charPowerController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateIdController } from "../middleware/charPowerMiddleware.js"; // Import middleware

const router = express.Router();

router.use(authMiddleware);

router.post("/", addCharacterPower);
// FIX: Add validation middleware here
router.get("/", validateIdController, getCharactersPowers);
router.delete("/:storyId/:characterId/:powerId", deleteCharacterPower);

export default router;