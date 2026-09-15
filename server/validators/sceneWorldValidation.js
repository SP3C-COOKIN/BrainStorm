
import { z } from "zod";

export const createSceneWorldSchema = z.object({
    sceneId: z.string().uuid(),
    worldId: z.string().uuid()
});

export const getSceneWorldSchema = z.object({
    sceneId: z.string().uuid().optional(),
    worldId: z.string().uuid().optional()
})
.refine(
    data => data.sceneId || data.worldId,
    {
        message: "Scene ID or World ID is required"
    }
)
.refine(
    data => !(data.sceneId && data.worldId),
    {
        message: "Provide either sceneId or worldId, not both"
    }
);