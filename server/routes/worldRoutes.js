import express from 'express';
import { authMiddleware } from '../middleware/authMiddleware.js';

import {
    validatedWorldCreate,
    validatedWorldUpdate
} from "../middleware/worldMiddleware.js";

import { createWorld,
        getWorlds,
        editWorld,
        deleteWorld,
        getWorld,
  }  from '../controllers/worldController.js';

const router = express.Router();

router.post("/", authMiddleware, validatedWorldCreate, createWorld);

router.get("/", authMiddleware, getWorlds);

router.get("/:id", authMiddleware, getWorld);

router.patch("/:id", authMiddleware, validatedWorldUpdate, editWorld);

router.delete("/:id", authMiddleware, deleteWorld);

export default router;