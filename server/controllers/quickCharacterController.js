import prisma from "../lib/prisma.js";

export const createQuickCharacter = async (req, res) => {
    try {
        const { name, description } = req.body;

        const quickCharacter = await prisma.quickCapture.create({
            data: {
                name,
                description,
                type: "CHARACTER",
                userId: req.user.id
            }
        });

        return res.status(201).json(quickCharacter);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to create quick character"
        });
    }
};

export const getQuickCharacters = async (req, res) => {
    try {
        const quickCharacters = await prisma.quickCapture.findMany({
            where: {
                userId: req.user.id,
                type: "CHARACTER"
            }
        });

        return res.status(200).json(quickCharacters);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to get quick characters"
        });
    }
};

export const editQuickCharacter = async (req, res) => {
    try {

        const quickCharacter =  await prisma.quickCapture.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!quickCharacter) {
            return res.status(404).json({
                message: "the character does not belong to the user"
            });
        }

        const updatedQuickCharacter = await prisma.quickCapture.update({
            where: {
                id: character.id
            },
            data: req.body
        });

        return res.status(200).json(quickCharacter);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to edit quick character"
        });
    }
};

export const deleteQuickCharacter = async (req, res) => {
    try {
        const quickCharacter = await prisma.quickCapture.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!quickCharacter) {
            return res.status(404).json({
                message: "Quick character not found"
            });
        }

        await prisma.quickCapture.delete({
            where: {
                id: quickCharacter.id
            }
        });

        return res.status(200).json({
            message: "Capture deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to delete quick character"
        });
    }
};