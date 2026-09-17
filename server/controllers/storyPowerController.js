import prisma from "../lib/prisma.js";

export const addStoryPower = async (req, res) => {
    try {
        const { storyId, powerId } = req.body;

        const story = await prisma.story.findFirst({
            where: {
                id: storyId,
                world: {
                    userId: req.user.id
                }
            }
        });

        if (!story) {
            return res.status(404).json({
                message: "Story not found"
            });
        }

        const power = await prisma.power.findFirst({
            where: {
                id: powerId,
                userId: req.user.id
            }
        });

        if (!power) {
            return res.status(404).json({
                message: "Power not found"
            });
        }

        const existingRelationship = await prisma.storyPower.findUnique({
            where: {
                storyId_powerId: {
                    storyId,
                    powerId
                }
            }
        });

        if (existingRelationship) {
            return res.status(409).json({
                message: "Story-power relationship already exists"
            });
        }

        const relationship = await prisma.storyPower.create({
            data: {
                storyId: story.id,
                powerId: power.id
            }
        });

        return res.status(201).json(relationship);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Couldn't create story-power relationship"
        });
    }
};

export const getStoryPower = async (req, res) => {
    try {
        const { storyId, powerId } = req.validatedQuery;

        if (storyId) {
            const story = await prisma.story.findFirst({
                where: {
                    id: storyId,
                    world: {
                        userId: req.user.id
                    }
                }
            });

            if (!story) {
                return res.status(404).json({
                    message: "Story not found"
                });
            }

            const powers = await prisma.storyPower.findMany({
                where: {
                    storyId
                },
                include: {
                    power: true
                }
            });

            return res.status(200).json(powers);
        }

        if (powerId) {
            const power = await prisma.power.findFirst({
                where: {
                    id: powerId,
                    userId: req.user.id
                }
            });

            if (!power) {
                return res.status(404).json({
                    message: "Power not found"
                });
            }

            const stories = await prisma.storyPower.findMany({
                where: {
                    powerId
                },
                include: {
                    story: true
                }
            });

            return res.status(200).json(stories);
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Could not get story-power relationships"
        });
    }
};

export const deleteStoryPower = async (req, res) => {
    try {
        const { storyId, powerId } = req.params;

        const story = await prisma.story.findFirst({
            where: {
                id: storyId,
                world: {
                    userId: req.user.id
                }
            }
        });

        if (!story) {
            return res.status(404).json({
                message: "Story not found"
            });
        }

        const power = await prisma.power.findFirst({
            where: {
                id: powerId,
                userId: req.user.id
            }
        });

        if (!power) {
            return res.status(404).json({
                message: "Power not found"
            });
        }

        const relationship = await prisma.storyPower.findUnique({
            where: {
                storyId_powerId: {
                    storyId,
                    powerId
                }
            }
        });

        if (!relationship) {
            return res.status(404).json({
                message: "Story-power relationship not found"
            });
        }

        await prisma.storyPower.delete({
            where: {
                storyId_powerId: {
                    storyId,
                    powerId
                }
            }
        });

        return res.status(200).json({
            message: "Story-power relationship deleted successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Could not delete story-power relationship"
        });
    }
};