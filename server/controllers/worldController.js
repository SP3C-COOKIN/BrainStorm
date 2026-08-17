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
            message: "Failed to create the world.",
        });
    }
}

export const getWorlds = async (req, res) => {
    const worlds = await prisma.world.findMany({
        where: {
            userId: req.user.id
        }
    });

    return res.status(200).json(worlds);
}