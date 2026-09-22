import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import worldRoutes from "./routes/worldRoutes.js";
import characterRoutes from "./routes/characterRoutes.js";
import characterWorldRoutes from "./routes/characterWorldRoutes.js"
import storyRoutes from "./routes/storyRoutes.js";
import chapterRoutes from "./routes/chapterRoutes.js";
import powerRoutes from "./routes/powerRoutes.js";
import sceneRoutes from "./routes/sceneRoutes.js";
import charPowerRoutes from "./routes/charPowerRoutes.js";
import charStoryRoutes from "./routes/charStoryRoutes.js";
import storyPowerRoutes from "./routes/storyPowerRoutes.js";
import storySceneRoutes from "./routes/storySceneRoutes.js";
import worldSceneRoutes from "./routes/worldSceneRoutes.js";
import characterSceneRoutes from "./routes/characterSceneRoutes.js"
import worldPowerRoutes from "./routes/worldPowerRoutes.js";
import scenePowerRoutes from "./routes/scenePowerRoutes.js";
import quickCharacterRoutes from "./routes/quickCharacterRoutes.js"
import quickSceneRoutes from "./routes/quickSceneRoutes.js";
import quickPowerRoutes from "./routes/quickPowerRoutes.js";
import quickWorldRoutes from "./routes/quickWorldRoutes.js";
import quickStoryRoutes from "./routes/quickStoryRoutes.js";

import rateLimit from 'express-rate-limit'

const app = express();

const authLimiter = rateLimit({ 
    windowMs: 15 * 60 * 1000, 
    limit: 10,   
    message: { message: "Too many attempts. Please try again later" }, // just a console message what will we eevn do with this? use this as a response to show an actual message on the frontend?
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/worlds', worldRoutes);
app.use('/api', storyRoutes);
app.use('/api', chapterRoutes);
app.use('/api/characters', characterRoutes);
app.use('/api/powers', powerRoutes);
app.use('/api/scenes', sceneRoutes);  
app.use('/api/character-world', characterWorldRoutes);
app.use('/api/character-power', charPowerRoutes);
app.use("/api/character-story", charStoryRoutes);
app.use("/api/story-power", storyPowerRoutes);
app.use("/api/story-scene", storySceneRoutes);
app.use("/api/world-scene", worldSceneRoutes);
app.use("/api/character-scene", characterSceneRoutes);
app.use("/api/world-power", worldPowerRoutes);
app.use("/api/scene-powers", scenePowerRoutes);
app.use("/api/quick-character", quickCharacterRoutes);
app.use("/api/quick-scene", quickSceneRoutes);
app.use("/api/quick-power", quickPowerRoutes);
app.use("/api/quick-world", quickWorldRoutes);
app.use("/api/quick-story", quickStoryRoutes)

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

