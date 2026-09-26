import { createQuickCharacterSchema, editQuickCharacterSchema} from "../validators/quickCharacterValidation.js"

export const createQuickCharMiddleware = async (req, res, next) => {
    const result = await createQuickCharacterSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid Data",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
};

export const editQuickCharMiddleware = async (req, res, next) => {
    const result = await editQuickCharacterSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid Data",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
};