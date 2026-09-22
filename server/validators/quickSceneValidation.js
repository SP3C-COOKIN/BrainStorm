import { z } from "zod";

export const createQuickSceneSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional()
});

export const editQuickSceneSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional()
});