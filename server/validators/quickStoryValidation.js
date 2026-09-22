import { z } from "zod";

export const quickStorySchema = z.object({
    id: z.string().uuid()
});