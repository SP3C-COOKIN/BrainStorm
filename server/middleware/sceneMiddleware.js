import { createSceneSchema, updateSceneSchema } from "../validators/sceneValidation.js"

export const createSceneMiddleware = (req, res, next) => {
    try {
        const result = createSceneSchema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "invalid data",
                errors: result.error.issues
            });
        }
        req.body = result.data;

        next();
    } catch (error) {
        return res.status(400).json({
            message: "Invalid scene data",
            errors: result.error.errors
        });
    }
};

export const updateSceneMiddleware = (req, res, next) => {
    try {
        const validatedData = updateSceneSchema.parse(req.body);

        req.body = validatedData;

        next();
    } catch (error) {
        return res.status(400).json({
            message: "Invalid scene data",
            errors: result.error.errors
        });
    }
};