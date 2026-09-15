// routes/scenePowerRoutes.js

import express from "express";

import {
    addPowerToScene,
    getScenePower,
    deleteScenePower
} from "../controllers/scenePowerController.js";

import {
    validateCreateScenePower,
    validateGetScenePower
} from "../middleware/scenePowerMiddleware.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validateCreateScenePower, addPowerToScene);

router.get("/", validateGetScenePower, getScenePower);

router.delete("/:sceneId/:powerId", deleteScenePower);

export default router;