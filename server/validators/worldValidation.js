import { z } from "zod";

export const createWorldSchema = z.object ({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(1000).optional(),
    genres: z.array(z.string()).optional(),
    colorTheme: z.string().optional()
});

export const updateWorldSchema = createWorldSchema
    .partial()
    .refine(
        data => Object.keys(data).length > 0,
        {
            message: "at least one field required"
        }
    );