import express from "express";

import {
    createQuickScene,
    getQuickScene,
    editQuickScene,
    deleteQuickScene
} from "../controllers/quickSceneController.js";

import {
    createQuickSceneMiddleware,
    editQuickSceneMiddleware
} from "../middleware/quickSceneMiddleware.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", createQuickSceneMiddleware, createQuickScene);

router.get("/", getQuickScene);

router.patch("/:id", editQuickSceneMiddleware, editQuickScene);

router.delete("/:id", deleteQuickScene);

export default router;