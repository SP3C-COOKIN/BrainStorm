// routes/characterSceneRoutes.js

import express from "express";

import {
    addCharacterToScene,
    getCharacterScene,
    deleteCharacterScene
} from "../controllers/characterSceneController.js";

import {
    validateCreateCharacterScene,
    validateGetCharacterScene
} from "../middleware/characterSceneMiddleware.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateCreateCharacterScene, addCharacterToScene);

router.get("/", validateGetCharacterScene, getCharacterScene);

router.delete("/:characterId/:sceneId", deleteCharacterScene);

export default router;