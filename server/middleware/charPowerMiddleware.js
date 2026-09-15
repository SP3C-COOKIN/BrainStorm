import { validateIdSchema } from "../validators/charPowerValidation.js";

export const validateIdController = async (req, res, next) => {
    const result = validateIdSchema.safeParse(req.query);

    if (!result.success) {
        return res.status(400).json({
            message: "inputted data is invalid",
            errors: result.error.issues
        });
    }
    req.query = result.data
    next();
};