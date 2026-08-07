import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware';
import { createWorld } from '../controllers/worldController'

const router = express.Router();

router.post("/", authMiddleware, createWorld);
export default router;
