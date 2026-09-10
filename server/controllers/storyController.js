import prisma from "../lib/prisma.js";

export const createStory = async (req, res) => {
    try {
        const {
            title,
            description
        } = req.body;

        const world = await prisma.world.findFirst({
            where: {
                id: req.params.worldId,
                userId: req.user.id
            }
    });

        if (!world) {
            return res.status(404).json({
                message: "World not found"
            });
        }

        const story = await prisma.story.create({
            data: {
                title,
                description,
                worldId: req.params.worldId
            }
        });

        return res.status(201).json(story);

    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed at create the story.",
        });
    }
}

export const getStory = async (req, res) => {
    try {
        const world = await prisma.world.findFirst({ // find if the world exists + if the world is owned by the user
            where: {
                id: req.params.worldId,
                userId: req.user.id
            }
        });

        if (!world) { // if it doesnt then send a 404 request
            return res.status(404).json({
                message: "World does not belong to the user"
            });
        }

        const story = await prisma.story.findFirst({ //check if the story exists in the world 
            where: {
                id: req.params.id,
                worldId: world.id
            }
        });

        if (!story) { // if it doesnt then send a 404 res
            return res.status(404).json({
                message: "The story doesn't belong to the World"
            });
        }

        return res.status(200).json(story)
    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Couldn't get the story"
        });
    }
};

export const getStories = async (req, res) => {
    try {
        const stories = await prisma.story.findMany({
            where: {
                worldId: req.params.worldId,
                world: {
                    userId: req.user.id
                }
            }
        });

        return res.status(200).json(stories);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not get the stories"
        });
    }
};

export const editStory = async (req, res) => {
    try {
        const world = await prisma.world.findFirst({ //find the worldId and check if its owned by the user
            where: {
                id: req.params.worldId,
                userId: req.user.id
            }
        });
 
        if (!world) {
            return res.status(404).json({
                message: "World does not belong to the user"
            });
        }
        
        const story = await prisma.story.findFirst({ // check if the story exists in the world/belongs to the user
            where: {
                id: req.params.id,
                worldId: world.id
            }
        });

        if (!story) {
            return res.status(404).json({
                message: "The story does not exist"
            });
        }

        const editStory = await prisma.story.update({
            where: {
                id: story.id
            },

            data: req.body
            
        });

        return res.status(200).json(editStory);
    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not edit the world"
        });
    }
};

export const deleteStory = async (req, res) => {
    try {

        const world = await prisma.world.findFirst({
            where: {
                id: req.params.worldId,
                userId: req.user.id
            }
        });

        if (!world) {
            return res.status(404).json({
                message: "The world does not exist"
            });
        }

        const story = await prisma.story.findFirst({
            where: {
                id: req.params.id,
                worldId: world.id
            }
        });

        if (!story) {
            return res.status(404).json({
                message: "The story does not exist"
            });
        }

        await prisma.story.delete({
            where: {
                id: story.id
            }
        });

        return res.status(200).json({
            message: "Story deleted successfully"
        });

    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Couldn't delete the story"
        });
    }
};

