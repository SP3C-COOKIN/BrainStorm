import express from "express";

import { authMiddleware } from "../middleware/authMiddleware.js";
import { validateWorldCharacter } from "../middleware/characterWorldMiddleware.js";

import {
    addCharacterToWorld,
    deleteCharacterToWorld,
    getCharacterWorldRelationship,
    getCharacters,
    getWorlds
} from "../controllers/characterWorldController.js";

const router = express.Router();

router.post(
    "/worlds/:worldId/characters/:characterId",
    authMiddleware,
    validateWorldCharacter,
    addCharacterToWorld
);

router.get(
    "/worlds/:worldId/characters/:characterId",
    authMiddleware,
    validateWorldCharacter,
    getCharacterWorldRelationship
);

router.get(
    "/worlds/:worldId/characters",
    authMiddleware,
    getCharacters
);

router.get(
    "/characters/:characterId/worlds",
    authMiddleware,
    getWorlds
);

router.delete(
    "/worlds/:worldId/characters/:characterId",
    authMiddleware,
    validateWorldCharacter,
    deleteCharacterToWorld
);

export default router;