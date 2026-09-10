import { worldCharacterSchema } from "../validators/characterWorldValidation.js";

export const validateWorldCharacter = (req, res, next) => {
    const result = worldCharacterSchema.safeParse(req.params);

    if (!result.success) {
        return res.status(400).json({
            message: "Invalid world or character ID",
            errors: result.error.issues
        });
    }

    next();
};