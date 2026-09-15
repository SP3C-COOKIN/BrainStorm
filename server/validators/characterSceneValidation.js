import { z } from "zod";

export const createCharacterSceneSchema = z.object({
    characterId: z.string().uuid(),
    sceneId: z.string().uuid()
});

export const getCharacterSceneSchema = z.object({
    characterId: z.string().uuid().optional(),
    sceneId: z.string().uuid().optional()
})
.refine(
    data => data.characterId || data.sceneId,
    {
        message: "Character ID or Scene ID is required"
    }
)
.refine(
    data => !(data.characterId && data.sceneId),
    {
        message: "Provide either characterId or sceneId, not both"
    }
);