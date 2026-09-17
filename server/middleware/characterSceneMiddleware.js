import {
    createCharacterSceneSchema,
    getCharacterSceneSchema
} from "../validators/characterSceneValidation.js";

export const validateCreateCharacterScene = (req, res, next) => {
    const result = createCharacterSceneSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Character ID or Scene ID is invalid",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
};

export const validateGetCharacterScene = (req, res, next) => {
    const result = getCharacterSceneSchema.safeParse(req.query);

    if (!result.success) {
        return res.status(400).json({
            message: "Character ID or Scene ID is invalid",
            errors: result.error.issues
        });
    }

    req.validatedQuery = result.data;
    next();
};