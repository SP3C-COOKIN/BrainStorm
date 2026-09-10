import { createChapterSchema, updateChapterSchema } from "../validators/chapterValidation.js";

export const createChapterMiddleware = (req, res, next) => {
    const result = createChapterSchema.safeParse(req.body);
    
    if(!result.success) {
        return res.status(400).json({
            message: result.error.issues
        });
    }
    req.body = result.data;
    next();
};

export const updateChapterMiddleware = (req, res, next) => {
    const result = updateChapterSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: result.error.issues
        });
    }

    req.body = result.data;
    next();
};