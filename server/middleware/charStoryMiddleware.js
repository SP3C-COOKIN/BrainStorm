import {
    createStoryCharacterSchema,
    getStoryCharacterSchema
} from "../validators/charStoryValidation.js";

export const validateCreateStoryCharacter = (req, res, next) => {
    const result = createStoryCharacterSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Story ID or Character ID is invalid",
            errors: result.error.issues
        });
    }

    req.body = result.data;

    next();
};

export const validateGetStoryCharacter = (req, res, next) => {
    const result = getStoryCharacterSchema.safeParse(req.query);

    if (!result.success) {
        return res.status(400).json({
            message: "Story ID or Character ID is invalid",
            errors: result.error.issues
        });
    }

    req.query = result.data;

    next();
};