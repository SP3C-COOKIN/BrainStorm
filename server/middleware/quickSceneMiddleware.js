import {
    createQuickSceneSchema,
    editQuickSceneSchema
} from "../validators/quickSceneValidation.js";

export const createQuickSceneMiddleware = async (req, res, next) => {
    const result = await createQuickSceneSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid Data",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
};

export const editQuickSceneMiddleware = async (req, res, next) => {
    const result = await editQuickSceneSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid Data",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
};