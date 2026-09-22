import prisma from "../lib/prisma.js";

export const createQuickPower = async (req, res) => {
    try {
        const { name, description } = req.body;

        const quickPower = await prisma.quickCapture.create({
            data: {
                name,
                description,
                type: "POWER",
                userId: req.user.id
            }
        });

        return res.status(201).json(quickPower);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to create quick power"
        });
    }
};

export const getQuickPower = async (req, res) => {
    try {
        const quickPowers = await prisma.quickCapture.findMany({
            where: {
                userId: req.user.id,
                type: "POWER"
            }
        });

        return res.status(200).json(quickPowers);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to get quick powers"
        });
    }
};

export const editQuickPower = async (req, res) => {
    try {
        const quickPower = await prisma.quickCapture.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!quickPower) {
            return res.status(404).json({
                message: "Quick power not found"
            });
        }

        const updatedQuickPower = await prisma.quickCapture.update({
            where: {
                id: quickPower.id
            },
            data: req.body
        });

        return res.status(200).json(updatedQuickPower);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to edit quick power"
        });
    }
};

export const deleteQuickPower = async (req, res) => {
    try {
        const quickPower = await prisma.quickCapture.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!quickPower) {
            return res.status(404).json({
                message: "Quick power not found"
            });
        }

        await prisma.quickCapture.delete({
            where: {
                id: quickPower.id
            }
        });

        return res.status(200).json({
            message: "Capture deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to delete quick power"
        });
    }
};