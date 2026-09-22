import prisma from "../lib/prisma.js";

export const createQuickWorldController = async (req, res) => {
    try {
        const { worldId, quickCaptureId } = req.body;

        const world = await prisma.world.findFirst({
            where: {
                id: worldId,
                userId: req.user.id
            }
        });

        if (!world) {
            return res.status(404).json({
                message: "the world doesnt belong to the user"
            });
        }

        const quickCapture = await prisma.quickCapture.findFirst({
            where: {
                id: quickCaptureId,
                userId: req.user.id
            }
        });

        if (!quickCapture) {
            return res.status(404).json({
                message: "the quick capture doesnt belong to the user"
            });
        }

        const existingRelation = await prisma.quickCaptureWorld.findFirst({
            where: {
                quickCaptureId: quickCapture.id,
                worldId: world.id
            }
        });

        if (existingRelation) {
            return res.status(409).json({
                message: "The relation already exists"
            });
        }

        const quickCaptureWorld = await prisma.quickCaptureWorld.create({
            data: {
                worldId: world.id,
                quickCaptureId: quickCapture.id
            }
        });

        return res.status(201).json(quickCaptureWorld);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Couldn't create quickCapture-world relationship"
        });
    }
};

export const getQuickWorldController = async (req, res) => {
    try{
        const { quickCaptureId } = req.params;

        const quickCapture = await prisma.quickCapture.findFirst({
            where: {
                id: quickCaptureId,
                userId: req.user.id
            }
        });

        if (!quickCapture) {
            return res.status(404).json({
                message: "The quick capture does not belong to the user"
            });
        }

        const relation = await prisma.quickCaptureWorld.findMany({
            where: {
                quickCaptureId: quickCapture.id
            }
        });

        if (relation.length === 0) {
            return res.status(404).json({
                message: "The relations does not exist"
            })
        }

        return res.status(200).json(relation)

    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Couldn't create quickCapture-world relationship"
        });
    }
};

export const deleteQuickWorldController = async (req, res) => {
    try {
        const { quickCaptureId, worldId } = req.params;

        const quickCapture = await prisma.quickCapture.findFirst({
            where:{
            id: quickCaptureId,
            userId: req.user.id
            }
        });

        if (!quickCapture) {
            return res.status(404).json({
                message: "The quick capture does not belong to the user"
            });
        }

        const world = await prisma.world.findFirst({
            where:{
                id: worldId,
                userId: req.user.id
            }
        });

        if (!world) {
            return res.status(404).json({
                message: "The world doesnt belong to the user"
            });
        }

        const relation = await prisma.quickCaptureWorld.findFirst({
            where: {
                quickCaptureId_worldId: {
                    quickCaptureId: quickCapture.id,
                    worldId: world.id
                }
            }
        });

        if (!relation) {
            return res.status(404).json({
            message: "The relation does not exist"
            });
        }

        const deleteRelation = await prisma.quickCaptureWorld.delete({
            where:{
                quickCaptureId_worldId: {
                    quickCaptureId: quickCapture.id,
                    worldId: world.id
                }   
            }
        });

        return res.status(200).json({
            message: "Relation deleted successfully"
        });

    }   catch(error) {        
            console.error(error);

            return res.status(500).json({
                message: "Couldn't create quickCapture-world relationship"
        });
    }
}