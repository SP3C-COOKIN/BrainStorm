// middleware/scenePowerMiddleware.js

import {
    createScenePowerSchema,
    getScenePowerSchema
} from "../validators/scenePowerValidation.js";

export const validateCreateScenePower = (req, res, next) => {
    const result = createScenePowerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Scene ID or Power ID is invalid",
            errors: result.error.issues
        });
    }

    req.body = result.data;

    next();
};

export const validateGetScenePower = (req, res, next) => {
    const result = getScenePowerSchema.safeParse(req.query);

    if (!result.success) {
        return res.status(400).json({
            message: "Scene ID or Power ID is invalid",
            errors: result.error.issues
        });
    }

    req.query = result.data;

    next();
};