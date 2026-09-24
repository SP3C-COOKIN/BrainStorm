import express from "express";

import {
    devSceneController
} from "../controllers/devSceneController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

import { devSceneMiddleware } from "../middleware/sceneDevMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/:quickCaptureId", devSceneMiddleware, devSceneController);

export default router;