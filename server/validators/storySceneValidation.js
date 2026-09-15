// storySceneValidation.ts

import { z } from "zod";

export const createStorySceneSchema = z.object({
    storyId: z.string().uuid(),
    sceneId: z.string().uuid()
});

export const getStorySceneSchema = z.object({
    storyId: z.string().uuid().optional(),
    sceneId: z.string().uuid().optional()
})
.refine(
    data => data.storyId || data.sceneId,
    {
        message: "Story ID or Scene ID is required"
    }
)
.refine(
    data => !(data.storyId && data.sceneId),
    {
        message: "Provide either storyId or sceneId, not both"
    }
);