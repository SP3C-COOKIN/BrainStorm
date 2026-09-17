import {
    createStorySceneSchema,
    getStorySceneSchema
} from "../validators/storySceneValidation.js";

export const validateCreateStoryScene = (req, res, next) => {
    const result = createStorySceneSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Story ID or Scene ID is invalid",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
};

export const validateGetStoryScene = (req, res, next) => {
    const result = getStorySceneSchema.safeParse(req.query);

    if (!result.success) {
        return res.status(400).json({
            message: "Story ID or Scene ID is invalid",
            errors: result.error.issues
        });
    }

    req.validatedQuery = result.data;
    next();
};