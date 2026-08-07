import prisma from "../lib/prisma.js";

export const createWorld = async (req, res) => {
    try {
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
    } catch {
        console.error(error);

        return res.status(500).json({
            message: "Failed to create the world.",
        });
    }
}