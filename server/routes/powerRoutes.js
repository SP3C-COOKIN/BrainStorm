import express from "express";
import {
  createPower,
  getPower,
  getPowers,
  editPower,
  deletePower
} from "../controllers/powerController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { validatePowerCreate, validatePowerUpdate } from "../middleware/powerMiddleware.js";

const router = express.Router();

router.use(authMiddleware);

router.post("/", validatePowerCreate, createPower);
router.get("/", getPowers);
router.get("/:id", getPower);
router.patch("/:id", validatePowerUpdate, editPower);
router.delete("/:id", deletePower);

export default router;