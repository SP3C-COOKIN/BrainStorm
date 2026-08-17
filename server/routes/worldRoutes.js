import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { createWorld, getWorlds } from '../controllers/worldController.js';

const router = express.Router();

router.post("/", authMiddleware, createWorld);
router.get("/", authMiddleware, getWorlds);
export default router;
