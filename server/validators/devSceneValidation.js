import { z } from "zod";

export const devSceneSchema = z.object({
    quickCaptureId: z.string().uuid()
});