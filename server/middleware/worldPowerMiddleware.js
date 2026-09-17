import {
    createWorldPowerSchema,
    getWorldPowerSchema
} from "../validators/worldPowerValidation.js";

export const validateCreateWorldPower = (req, res, next) => {
    const result = createWorldPowerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "World ID or Power ID is invalid",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
};

export const validateGetWorldPower = (req, res, next) => {
    const result = getWorldPowerSchema.safeParse(req.query);

    if (!result.success) {
        return res.status(400).json({
            message: "World ID or Power ID is invalid",
            errors: result.error.issues
        });
    }

    req.validatedQuery = result.data;
    next();
};