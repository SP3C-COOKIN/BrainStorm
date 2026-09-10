import { z } from "zod";

export const worldCharacterSchema = z.object({
    worldId: z.string().uuid(),
    characterId: z.string().uuid()
});