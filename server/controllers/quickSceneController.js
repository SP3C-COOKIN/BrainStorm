import prisma from "../lib/prisma.js";

export const createQuickScene = async (req, res) => {
    try {
        const { name, description } = req.body;

        const quickScene = await prisma.quickCapture.create({
            data: {
                name,
                description,
                type: "SCENE",
                userId: req.user.id
            }
        });

        return res.status(201).json(quickScene);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to create quick scene"
        });
    }
};

export const getQuickScene = async (req, res) => {
    try {
        const quickScenes = await prisma.quickCapture.findMany({
            where: {
                userId: req.user.id,
                type: "SCENE"
            }
        });

        return res.status(200).json(quickScenes);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to get quick scenes"
        });
    }
};

export const editQuickScene = async (req, res) => {
    try {
        const quickScene = await prisma.quickCapture.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!quickScene) {
            return res.status(404).json({
                message: "Quick scene not found"
            });
        }

        const updatedQuickScene = await prisma.quickCapture.update({
            where: {
                id: quickScene.id
            },
            data: req.body
        });

        return res.status(200).json(updatedQuickScene);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to edit quick scene"
        });
    }
};

export const deleteQuickScene = async (req, res) => {
    try {
        const quickScene = await prisma.quickCapture.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!quickScene) {
            return res.status(404).json({
                message: "Quick scene not found"
            });
        }

        await prisma.quickCapture.delete({
            where: {
                id: quickScene.id
            }
        });

        return res.status(200).json({
            message: "Capture deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to delete quick scene"
        });
    }
};