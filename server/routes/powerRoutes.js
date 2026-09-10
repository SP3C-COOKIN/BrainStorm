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

router.post("/powers", authMiddleware, validatePowerCreate, createPower);
router.get("/powers/:powerId", authMiddleware, getPower);
router.get("/powers", authMiddleware, getPowers);
router.patch("/powers/:powerId", authMiddleware, validatePowerUpdate, editPower);
router.delete("/power/:powerId", authMiddleware, deletePower);

export default router;