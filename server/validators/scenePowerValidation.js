// validators/scenePowerValidation.js

import { z } from "zod";

export const createScenePowerSchema = z.object({
    sceneId: z.string().uuid(),
    powerId: z.string().uuid()
});

export const getScenePowerSchema = z.object({
    sceneId: z.string().uuid().optional(),
    powerId: z.string().uuid().optional()
})
.refine(
    data => data.sceneId || data.powerId,
    {
        message: "Scene ID or Power ID is required"
    }
)
.refine(
    data => !(data.sceneId && data.powerId),
    {
        message: "Provide either sceneId or powerId, not both"
    }
);