import { createWorldSchema, updateWorldSchema }
    from "../validators/worldValidation.js";

export const validatedWorldCreate = (req, res, next) => {
    const result = createWorldSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: result.error.issues
        });
    }

    req.body = result.data;
    next();
};

export const validatedWorldUpdate = (req, res, next) => {
    const result = updateWorldSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: result.error.issues
        });
    }

    req.body = result.data;
    next();
};