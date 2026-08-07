import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import worldRoutes from "./routes/worldRoutes.js";
import rateLimit from 'express-rate-limit'

const app = express();

const authLimiter = rateLimit({ 
    windowMs: 15 * 60 * 1000, 
    limit: 5,   
    message: { message: "Too many attempts. Please try again later" }, // just a console message what will we eevn do with this? use this as a response to show an actual message on the frontend?
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authLimiter, authRoutes)
app.use("/api/worlds", worldRoutes)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

