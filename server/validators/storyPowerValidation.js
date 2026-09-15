import { z } from "zod";

export const createStoryPowerSchema = z.object({
    storyId: z.string().uuid(),
    powerId: z.string().uuid()
});

export const getStoryPowerSchema = z.object({
    storyId: z.string().uuid().optional(),
    powerId: z.string().uuid().optional()
})
.refine(
    data => data.storyId || data.powerId,
    {
        message: "Story ID or Power ID is required"
    }
)
.refine(
    data => !(data.storyId && data.powerId),
    {
        message: "Provide either storyId or powerId, not both"
    }
);