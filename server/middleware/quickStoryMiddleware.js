import { quickStorySchema } from "../validators/quickStoryValidation.js"

export const quickStoryMiddleware = async (req, res, next) => {
    const result = await quickStorySchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "The inputted data is invalid",
            errors: result.error.issues
        });
    }

    req.body = result.data
    next();
};