import prisma from "../lib/prisma.js";

export const createWorld = async (req, res) => {
    try {
        const { name, description, genres, colorTheme } = req.body;

        const world = await prisma.world.create({
            data: {
                name,
                description,
                genres,
                colorTheme,
                userId: req.user.id
            },
        });

        return res.status(201).json(world);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to create the world."
        });
    }
};

export const getWorlds = async (req, res) => {
    try {
        const worlds = await prisma.world.findMany({
            where: {
                userId: req.user.id
            }
        });

        return res.status(200).json(worlds);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Couldn't find your worlds"
        });
    }
};

export const getWorld = async (req, res) => {
    try {
        const world = await prisma.world.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!world) {
            return res.status(404).json({
                message: "World not found"
            });
        }

        return res.status(200).json(world);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Couldn't find the world"
        });
    }
};

export const editWorld = async (req, res) => {
    try {
        const world = await prisma.world.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!world) {
            return res.status(404).json({
                message: "World not found"
            });
        }

        const editedWorld = await prisma.world.update({
            where: {
                id: world.id
            },
            data: {
                name: req.body.name,
                description: req.body.description,
                genres: req.body.genres,
                colorTheme: req.body.colorTheme
            }
        });

        return res.status(200).json(editedWorld);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to edit the world"
        });
    }
};

export const deleteWorld = async (req, res) => {
    try {
        const world = await prisma.world.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!world) {
            return res.status(404).json({
                message: "World not found"
            });
        }

        await prisma.world.delete({
            where: {
                id: world.id
            }
        });

        return res.status(200).json({
            message: "World deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to delete the world"
        });
    }
};