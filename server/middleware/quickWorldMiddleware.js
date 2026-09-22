import {
    createQuickWorldSchema
} from "../validators/quickWorldValidation.js";

export const createQuickMiddleware = (req, res, next) => {
    const relation = createQuickWorldSchema.safeParse(req.body);

    if (!relation.success) {
        return res.status(400).json({
            message: "Inputted data is invaid",
            errors: relation.error.issues
        });
    }
    req.body = relation.data;
    next();
}