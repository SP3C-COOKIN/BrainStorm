import { z } from "zod";

export const validateIdSchema = z.object({
    storyId: z.string().uuid(),
    characterId: z.string().uuid().optional(),
    powerId: z.string().uuid().optional()
}).refine(
    data => data.characterId || data.powerId,
    { message: "Either Character's Id or Power's Id required"}
)
.refine(
    data => (data.characterId || data.powerId),
    {message: "Provide either Character's Id or Power's Id"}
)