import express from "express";

import {
    createPower,
    getPower,
    getPowers,
    editPower,
    deletePower
} from "../controllers/powerController.js"

import { authMiddleware } from "../middleware/authMiddleware.js";
import { validatePowerCreate, validatePowerUpdate } from "../middleware/powerMiddleware.js";

const router = express.Router();

router.post("/worlds", authMiddleware, validatePowerCreate, createPower);
router.get("/worlds/:worldId", authMiddleware, getPower);
router.get("/worlds", authMiddleware, getPowers);
router.patch("/worlds/:worldId", authMiddleware, validatePowerUpdate, editPower);
router.delete("/worlds/:worldId", authMiddleware, deletePower);

export default router;