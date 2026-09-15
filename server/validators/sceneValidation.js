import { z } from "zod";

export const createSceneSchema = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(10000).optional(),
});

export const updateSceneSchema = createSceneSchema
.partial()
.refine(
    data => Object.keys(data).length > 0, {
        message: "at least one field is required"
    }
);