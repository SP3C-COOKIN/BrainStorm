import { devCharSchema } from "../validators/devCharValidation.js";

export const charDevMiddleware = async (req, res, next) =>  {
    const verify = await devCharSchema.safeParse(req.body);

    if (!verify.success) {
        return res.status(400).json({
            message: "Invalid data",
            errors: verify.error.issues
        });
    }

    req.body = verify.data;
    next();
};

