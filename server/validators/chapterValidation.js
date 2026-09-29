import { z } from "zod";

export const createChapterSchema = z.object({
    title: z.string().min(1).max(100),
    content: z.string().min(1).max(10000).optioanl(),
});

export const updateChapterSchema = createChapterSchema
.partial()
.refine(
    data => Object.keys(data).length > 0,
    { message: "at least one field is required"}
    );