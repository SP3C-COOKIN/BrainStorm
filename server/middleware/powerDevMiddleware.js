import { devPowerSchema } from "../validators/devPowerValidation.js";

export const devPowerMiddleware = async (req, res, next) => {

    const verify = await devPowerSchema.safeParse(req.body);

    if (!verify.success) {
        return res.status(400).json({
            message: "Invalid data",
            errors: verify.error.issues
        });
    }

    req.body = verify.data;

    next();
};