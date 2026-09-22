import { z } from "zod";

export const createQuickPowerSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional()
});

export const editQuickPowerSchema = z.object({
    name: z.string().min(1).optional(),
    description: z.string().optional()
});