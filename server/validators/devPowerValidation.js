import { z } from "zod";

export const devPowerSchema = z.object({

    quickCaptureId: z.string().uuid()

});