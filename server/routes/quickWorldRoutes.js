import express from "express";

import {
    createQuickWorldController,
    getQuickWorldController,
    deleteQuickWorldController,
} from "../controllers/quickWorldController.js"

import { authMiddleware } from "../middleware/authMiddleware.js";
import { createQuickMiddleware } from "../middleware/quickWorldMiddleware.js"

const router = express.Router();

router.use( authMiddleware )

router.post("/:quickCaptureId/world/:worldId", createQuickMiddleware, createQuickWorldController);
router.get("/:quickCaptureId/world", getQuickWorldController)
router.delete("/:quickCaptureId/world/:worldId", deleteQuickWorldController)

export default router;