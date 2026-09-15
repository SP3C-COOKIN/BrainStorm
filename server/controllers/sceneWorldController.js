import prisma from "../lib/prisma.js";


export const addSceneToWorld = async (req, res) => {
    try {
        const { sceneId, worldId } = req.body;

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

        const world = await prisma.world.findFirst({
            where: {
                id: worldId,
                userId: req.user.id
            }
        });

        if (!world) {
            return res.status(404).json({
                message: "World not found"
            });
        }

        const existingRelationship = await prisma.sceneWorld.findUnique({
            where: {
                sceneId_worldId: {
                    sceneId,
                    worldId
                }
            }
        });

        if (existingRelationship) {
            return res.status(409).json({
                message: "Scene-world relationship already exists"
            });
        }

        const relationship = await prisma.sceneWorld.create({
            data: {
                sceneId: scene.id,
                worldId: world.id
            }
        });

        return res.status(201).json(relationship);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Couldn't create scene-world relationship"
        });
    }
};


export const getSceneWorld = async (req, res) => {
    try {
        const { sceneId, worldId } = req.query;

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

            const worlds = await prisma.sceneWorld.findMany({
                where: {
                    sceneId
                },
                include: {
                    world: true
                }
            });

            return res.status(200).json(worlds);
        }

        if (worldId) {
            const world = await prisma.world.findFirst({
                where: {
                    id: worldId,
                    userId: req.user.id
                }
            });

            if (!world) {
                return res.status(404).json({
                    message: "World not found"
                });
            }

            const scenes = await prisma.sceneWorld.findMany({
                where: {
                    worldId
                },
                include: {
                    scene: true
                }
            });

            return res.status(200).json(scenes);
        }

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not get scene-world relationships"
        });
    }
};

export const deleteSceneWorld = async (req, res) => {
    try {
        const { sceneId, worldId } = req.params;

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

        const world = await prisma.world.findFirst({
            where: {
                id: worldId,
                userId: req.user.id
            }
        });

        if (!world) {
            return res.status(404).json({
                message: "World not found"
            });
        }

        const relationship = await prisma.sceneWorld.findUnique({
            where: {
                sceneId_worldId: {
                    sceneId,
                    worldId
                }
            }
        });

        if (!relationship) {
            return res.status(404).json({
                message: "Scene-world relationship not found"
            });
        }

        await prisma.sceneWorld.delete({
            where: {
                sceneId_worldId: {
                    sceneId,
                    worldId
                }
            }
        });

        return res.status(200).json({
            message: "Scene-world relationship deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not delete scene-world relationship"
        });
    }
};