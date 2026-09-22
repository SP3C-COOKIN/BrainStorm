import express from "express";

import {
    createQuickPower,
    getQuickPower,
    editQuickPower,
    deleteQuickPower
} from "../controllers/quickPowerController.js";

import {
    createQuickPowerMiddleware,
    editQuickPowerMiddleware
} from "../middleware/quickPowerMiddleware.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createQuickPowerMiddleware, createQuickPower);

router.get("/", getQuickPower);

router.patch("/:id", editQuickPowerMiddleware, editQuickPower);

router.delete("/:id", deleteQuickPower);

export default router;