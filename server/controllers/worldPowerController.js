// controllers/worldPowerController.js

import prisma from "../lib/prisma.js";

export const addPowerToWorld = async (req, res) => {
    try {
        const { worldId, powerId } = req.body;

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

        const existingRelationship = await prisma.worldPower.findUnique({
            where: {
                worldId_powerId: {
                    worldId,
                    powerId
                }
            }
        });

        if (existingRelationship) {
            return res.status(409).json({
                message: "World-power relationship already exists"
            });
        }

        const relationship = await prisma.worldPower.create({
            data: {
                worldId: world.id,
                powerId: power.id
            }
        });

        return res.status(201).json(relationship);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Couldn't create world-power relationship"
        });
    }
};

export const getWorldPower = async (req, res) => {
    try {
        const { worldId, powerId } = req.query;

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

            const powers = await prisma.worldPower.findMany({
                where: {
                    worldId
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

            const worlds = await prisma.worldPower.findMany({
                where: {
                    powerId
                },
                include: {
                    world: true
                }
            });

            return res.status(200).json(worlds);
        }

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not get world-power relationships"
        });
    }
};

export const deleteWorldPower = async (req, res) => {
    try {
        const { worldId, powerId } = req.params;

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

        const relationship = await prisma.worldPower.findUnique({
            where: {
                worldId_powerId: {
                    worldId,
                    powerId
                }
            }
        });

        if (!relationship) {
            return res.status(404).json({
                message: "World-power relationship not found"
            });
        }

        await prisma.worldPower.delete({
            where: {
                worldId_powerId: {
                    worldId,
                    powerId
                }
            }
        });

        return res.status(200).json({
            message: "World-power relationship deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not delete world-power relationship"
        });
    }
};