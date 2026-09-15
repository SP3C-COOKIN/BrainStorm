// validators/storyCharacterValidation.js

import { z } from "zod";

export const createStoryCharacterSchema = z.object({
    storyId: z.string().uuid(),
    characterId: z.string().uuid(), 
});

export const getStoryCharacterSchema = z.object({
    storyId: z.string().uuid().optional(),
    characterId: z.string().uuid().optional()
})
.refine(
    data => data.storyId || data.characterId,
    {
        message: "Story ID or Character ID is required"
    }
)
.refine(
    data => !(data.storyId && data.characterId),
    {
        message: "Provide either storyId or characterId, not both"
    }
);