import { createCharacterSchema, updateCharacterSchema }
    from "../validators/characterValidation.js";

export const validateCharacterCreate = (req, res, next) => {
    const result = createCharacterSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json ({
            message: "inputted data is invalid",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
};

export const validateCharacterUpdate = (req, res, next) => {
    const result = updateCharacterSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json ({
            message: "inputted data is invalid",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
}
