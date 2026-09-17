import prisma from "../lib/prisma.js";

export const addStoryScene = async (req, res) => {
    try {
        const { storyId, sceneId } = req.body;

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

        const scene = await prisma.scene.findFirst({
            where: {
                id: sceneId,
                userId: req.user.id
            }
        });

        if (!scene) {
            return res.status(404).json({
                message: "Scene not found"
            });
        }

        const existingRelationship = await prisma.storyScene.findUnique({
            where: {
                storyId_sceneId: {
                    storyId,
                    sceneId
                }
            }
        });

        if (existingRelationship) {
            return res.status(409).json({
                message: "Story-scene relationship already exists"
            });
        }

        const relationship = await prisma.storyScene.create({
            data: {
                storyId: story.id,
                sceneId: scene.id
            }
        });

        return res.status(201).json(relationship);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Couldn't create story-scene relationship"
        });
    }
};

export const getStoryScene = async (req, res) => {
    try {
        const { storyId, sceneId } = req.validatedQuery;

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

            const scenes = await prisma.storyScene.findMany({
                where: {
                    storyId
                },
                include: {
                    scene: true
                }
            });

            return res.status(200).json(scenes);
        }

        if (sceneId) {
            const scene = await prisma.scene.findFirst({
                where: {
                    id: sceneId,
                    userId: req.user.id
                }
            });

            if (!scene) {
                return res.status(404).json({
                    message: "Scene not found"
                });
            }

            const stories = await prisma.storyScene.findMany({
                where: {
                    sceneId
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
            message: "Could not get story-scene relationships"
        });
    }
};

export const deleteStoryScene = async (req, res) => {
    try {
        const { storyId, sceneId } = req.params;

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

        const scene = await prisma.scene.findFirst({
            where: {
                id: sceneId,
                userId: req.user.id
            }
        });

        if (!scene) {
            return res.status(404).json({
                message: "Scene not found"
            });
        }

        const relationship = await prisma.storyScene.findUnique({
            where: {
                storyId_sceneId: {
                    storyId: story.id,
                    sceneId: scene.id
                }
            }
        });

        if (!relationship) {
            return res.status(404).json({
                message: "Story-scene relationship not found"
            });
        }

        await prisma.storyScene.delete({
            where: {
                storyId_sceneId: {
                    storyId: story.id,
                    sceneId: scene.id
                }
            }
        });

        return res.status(200).json({
            message: "Story-scene relationship deleted successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Could not delete story-scene relationship"
        });
    }
};