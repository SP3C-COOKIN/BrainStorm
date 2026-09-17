import { z } from "zod";

export const validateIdSchema = z.object({
    storyId: z.string().uuid().optional(),
    characterId: z.string().uuid().optional(),
    powerId: z.string().uuid().optional()
}).refine(
    data => data.storyId || data.characterId || data.powerId,
    { message: "Provide either storyId, characterId, or powerId" }
);