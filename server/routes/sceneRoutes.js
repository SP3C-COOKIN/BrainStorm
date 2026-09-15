import express from "express";

import {
    createScene,
    getScene,
    getScenes,
    editScene,
    deleteScene
} from "../controllers/sceneController.js"

import { authMiddleware } from "../middleware/authMiddleware.js"
import { createSceneMiddleware, updateSceneMiddleware } from "../middleware/sceneMiddleware.js"

const router = express.Router();

router.use(authMiddleware);

router.post("/", createSceneMiddleware, createScene);
router.get("/", getScenes);
router.get("/:id", getScene);

router.patch("/:id", updateSceneMiddleware, editScene);

router.delete("/:id", deleteScene);

export default router;