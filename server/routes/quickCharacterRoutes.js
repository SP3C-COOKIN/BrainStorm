import express from "express";

import {
    createQuickCharacter,
    getQuickCharacters,
    editQuickCharacter,
    deleteQuickCharacter
} from "../controllers/quickCharacterController.js";

import {
    createQuickCharMiddleware,
    editQuickCharMiddleware
} from "../middleware/quickCharacterMiddleware.js";

import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

router.use(authMiddleware);

router.post("/", createQuickCharMiddleware, createQuickCharacter);
router.get("/", getQuickCharacters);
router.patch("/:id", editQuickCharMiddleware, editQuickCharacter);
router.delete("/:id", deleteQuickCharacter)

export default router;