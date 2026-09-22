import {
    createQuickPowerSchema,
    editQuickPowerSchema
} from "../validators/quickPowerValidation.js";

export const createQuickPowerMiddleware = async (req, res, next) => {
    const result = await createQuickPowerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid Data",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
};

export const editQuickPowerMiddleware = async (req, res, next) => {
    const result = await editQuickPowerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid Data",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
};