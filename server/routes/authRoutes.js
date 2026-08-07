import express from "express";
import { signup, login } from "../controllers/authController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
const router = express.Router();

app.use(cors());
app.use(express.json());    

router.post("/signup", signup);
router.post("/login", login);

router.get("/me", authMiddleware, (req, res) => {
    return res.status(200).json({
        message: "Protected route works",
        user: req.user,
    });
});

export default router;