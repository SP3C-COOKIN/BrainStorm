// controllers/scenePowerController.js

import prisma from "../lib/prisma.js";

export const addPowerToScene = async (req, res) => {
    try {
        const { sceneId, powerId } = req.body;

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

        const existingRelationship = await prisma.scenePower.findUnique({
            where: {
                sceneId_powerId: {
                    sceneId,
                    powerId
                }
            }
        });

        if (existingRelationship) {
            return res.status(409).json({
                message: "Scene-power relationship already exists"
            });
        }

        const relationship = await prisma.scenePower.create({
            data: {
                sceneId: scene.id,
                powerId: power.id
            }
        });

        return res.status(201).json(relationship);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Couldn't create scene-power relationship"
        });
    }
};

export const getScenePower = async (req, res) => {
    try {
        const { sceneId, powerId } = req.query;

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

            const powers = await prisma.scenePower.findMany({
                where: {
                    sceneId
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

            const scenes = await prisma.scenePower.findMany({
                where: {
                    powerId
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
            message: "Could not get scene-power relationships"
        });
    }
};

export const deleteScenePower = async (req, res) => {
    try {
        const { sceneId, powerId } = req.params;

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

        const relationship = await prisma.scenePower.findUnique({
            where: {
                sceneId_powerId: {
                    sceneId,
                    powerId
                }
            }
        });

        if (!relationship) {
            return res.status(404).json({
                message: "Scene-power relationship not found"
            });
        }

        await prisma.scenePower.delete({
            where: {
                sceneId_powerId: {
                    sceneId,
                    powerId
                }
            }
        });

        return res.status(200).json({
            message: "Scene-power relationship deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not delete scene-power relationship"
        });
    }
};