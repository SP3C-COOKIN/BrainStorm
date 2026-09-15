// routes/worldPowerRoutes.js

import express from "express";

import {
    addPowerToWorld,
    getWorldPower,
    deleteWorldPower
} from "../controllers/worldPowerController.js";

import {
    validateCreateWorldPower,
    validateGetWorldPower
} from "../middleware/worldPowerMiddleware.js";

import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post(
    "/",
    validateCreateWorldPower,
    addPowerToWorld
);

router.get(
    "/",
    validateGetWorldPower,
    getWorldPower
);

router.delete(
    "/:worldId/:powerId",
    deleteWorldPower
);

export default router;