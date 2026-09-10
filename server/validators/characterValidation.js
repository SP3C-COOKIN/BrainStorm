import { z } from "zod";

export const createCharacterSchema = z.object({
    name: z.string().min(1).max(100),
    description: z.string().max(2000).optional(),
    age: z.number().int().positive().optional(),
    gender: z.string().max(40).optional(),
    race: z.string().max(100).optional(),
    occupation: z.string().max(200).optional(),
    appearance: z.string().max(2000).optional(),
    personality: z.string().max(2000).optional(),
    interests: z.array(z.string()).optional(),
    hobbies: z.array(z.string()).optional(),
});

export const updateCharacterSchema = createCharacterSchema
    .partial()
    .refine(
        data => Object.keys(data).length > 0,
        {
            message: "At least one field is required"
        }
    );