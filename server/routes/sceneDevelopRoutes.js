import express from "express";

import {
    devSceneController
} from "../controllers/devSceneController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/:quickCaptureId", devSceneController);

export default router;