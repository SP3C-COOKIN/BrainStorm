import express from 'express';

import { authMiddleware } from '../middleware/authMiddleware.js';

import {
    createCharacter,
    getCharacters,
    getCharacter,
    editCharacter,
    deleteCharacter
} from '../controllers/characterController.js';

import {
    validateCharacterCreate,
    validateCharacterUpdate
} from "../middleware/characterMiddleware.js";

const router = express.Router();

router.post("/", validateCharacterCreate, authMiddleware, createCharacter);

router.get("/", authMiddleware, getCharacters);

router.get("/:id", authMiddleware, getCharacter);

router.patch("/:id", validateCharacterUpdate, authMiddleware, editCharacter);

router.delete("/:id", authMiddleware, deleteCharacter);

export default router;