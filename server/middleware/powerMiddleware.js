import { createPowerSchema, updatePowerSchema } from "../validators/powerValidation.js";

export const validatePowerCreate = (req, res, next) => {
    const result = createPowerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "inputted data is invalid",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
}

export const validatePowerUpdate = (req, res, next) => {
    const result = updatePowerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "inputted data is invalid",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
}