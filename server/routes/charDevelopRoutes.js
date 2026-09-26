import express from "express";

import {
    devCharacterController
} from "../controllers/devCharController.js"

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware)

router.post("/:quickCaptureId", devCharacterController);

export default router;