import express from "express";

import {
    devCharacterController
} from "../controllers/devCharController.js"

import { authMiddleware } from "../middleware/authMiddleware.js";

import { charDevMiddleware } from "../middleware/devCharMiddleware.js"

const router = express.Router();

router.use(authMiddleware)

router.post("/:quickCaptureId", charDevMiddleware, devCharacterController);

export default router;