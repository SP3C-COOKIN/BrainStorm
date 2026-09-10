import { createStorySchema, updateStorySchema } from "../validators/storyValidation.js";

export const createStoryMiddleware = (req, res, next) => {
    const result = createStorySchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: result.error.issues
        });
    }
    req.body = result.data;
    next();
};

export const updateStoryMiddleware = (req, res, next) => {
    const result = updateStorySchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: result.error.issues
        });
    }

    req.body = result.data;
    next();
};