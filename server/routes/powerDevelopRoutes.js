import express from "express";
import { devPowerController } from "../controllers/powerDevController.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware)
router.post("/:quickCaptureId", devPowerController);

export default router;