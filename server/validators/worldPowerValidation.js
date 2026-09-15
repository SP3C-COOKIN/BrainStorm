// validators/worldPowerValidation.js

import { z } from "zod";

export const createWorldPowerSchema = z.object({
    worldId: z.string().uuid(),
    powerId: z.string().uuid()
});

export const getWorldPowerSchema = z.object({
    worldId: z.string().uuid().optional(),
    powerId: z.string().uuid().optional()
})
.refine(
    data => data.worldId || data.powerId,
    {
        message: "World ID or Power ID is required"
    }
)
.refine(
    data => !(data.worldId && data.powerId),
    {
        message: "Provide either worldId or powerId, not both"
    }
);