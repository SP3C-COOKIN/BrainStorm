import {
    createStoryPowerSchema,
    getStoryPowerSchema
} from "../validators/storyPowerValidation.js";

export const validateCreateStoryPower = (req, res, next) => {
    const result = createStoryPowerSchema.safeParse(req.body);

    if (!result.success) {
        return res.status(400).json({
            message: "Story ID or Power ID is invalid",
            errors: result.error.issues
        });
    }

    req.body = result.data;
    next();
};

export const validateGetStoryPower = (req, res, next) => {
    const result = getStoryPowerSchema.safeParse(req.query);

    if (!result.success) {
        return res.status(400).json({
            message: "Story ID or Power ID is invalid",
            errors: result.error.issues
        });
    }

    req.validatedQuery = result.data;
    next();
};