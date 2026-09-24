import { devSceneSchema } from "../validators/devSceneValidation.js";

export const devSceneMiddleware = async (req, res, next) => {
    const verify = await devSceneSchema.safeParse(req.body);

    if (!verify.success) {
        return res.status(400).json({
            message: "Invalid data",
            errors: verify.error.issues
        });
    }

    req.body = verify.data;
    next();
};