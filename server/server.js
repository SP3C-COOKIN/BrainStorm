import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import worldRoutes from "./routes/worldRoutes.js";
import characterRoutes from "./routes/characterRoutes.js";
import characterWorldRoutes from "./routes/characterWorldRoutes.js"
import storyRoutes from "./routes/storyRoutes.js";
import chapterRoutes from "./routes/chapterRoutes.js";
import powerRoutes from "./routes/powerRoutes.js"

import rateLimit from 'express-rate-limit'

const app = express();

const authLimiter = rateLimit({ 
    windowMs: 15 * 60 * 1000, 
    limit: 10,   
    message: { message: "Too many attempts. Please try again later" }, // just a console message what will we eevn do with this? use this as a response to show an actual message on the frontend?
});

app.use(cors());
app.use(express.json());

app.use("/api/auth", authLimiter, authRoutes);
app.use("/api/worlds", worldRoutes);
app.use("/api/characters", characterRoutes);
app.use("/api", characterWorldRoutes);
app.use("/api", storyRoutes);
app.use("/api", chapterRoutes);
app.use("/api/power", powerRoutes)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

