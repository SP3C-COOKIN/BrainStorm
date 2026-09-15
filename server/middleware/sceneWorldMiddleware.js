import {
    createSceneWorldSchema,
    getSceneWorldSchema
} from "../validators/sceneWorldValidation.js";

export const validateCreateSceneWorld = (req, res, next) => {
    const result = createSceneWorldSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Scene ID or World ID is invalid",
            errors: result.error.issues
        });
    }

    req.body = result.data;

    next();
};

export const validateGetSceneWorld = (req, res, next) => {
    const result = getSceneWorldSchema.safeParse(req.query);

    if (!result.success) {
        return res.status(400).json({
            message: "Scene ID or World ID is invalid",
            errors: result.error.issues
        });
    }

    req.query = result.data;

    next();
};