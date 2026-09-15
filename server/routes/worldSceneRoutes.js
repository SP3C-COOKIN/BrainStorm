import express from "express";

import {
    addSceneToWorld,
    getSceneWorld,
    deleteSceneWorld
} from "../controllers/sceneWorldController.js";

import {
    validateCreateSceneWorld,
    validateGetSceneWorld
} from "../middleware/sceneWorldMiddleware.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateCreateSceneWorld, addSceneToWorld);

router.get("/", validateGetSceneWorld, getSceneWorld);

router.delete("/:sceneId/:worldId", deleteSceneWorld);

export default router;