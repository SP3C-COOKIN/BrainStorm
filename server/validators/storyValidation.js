import { z } from "zod";

export const createStorySchema = z.object({
    title: z.string().min(1).max(100),
    description: z.string().min(1).max(1000).optional(),    
});

export const updateStorySchema = createStorySchema
.partial()
.refine(
    data => Object.keys(data).length > 0,
    { message: "at least one field is required" }
    );