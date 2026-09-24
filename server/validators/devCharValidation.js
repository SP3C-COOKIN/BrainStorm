import { z } from "zod";

export const devCharSchema = z.object({
    quickCaptureId: z.string().uuid()
});

