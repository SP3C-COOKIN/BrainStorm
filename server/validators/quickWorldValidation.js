import { z } from "zod";

export const createQuickWorldSchema = z.object({
    id: z.string().uuid(),
});