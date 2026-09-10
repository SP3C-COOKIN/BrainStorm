import { z } from "zod";

export const createPowerSchema = z.object ({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(10000).optional(),
});

export const updatePowerSchema = createPowerSchema
.partial()
.refine(
    data => Object.keys(data).length > 0,
    {
        message: "At least one field is required"
    }
);