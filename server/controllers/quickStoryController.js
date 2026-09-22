import prisma from "../lib/prisma.js";

export const createQuickStoryController = async (req, res) => {
    try{
        const { quickCaptureId, storyId} = req.params;

        const quickCapture = await prisma.quickCapture.findFirst({
            where: {
            id: quickCaptureId,
            userId: req.user.id
            }
        });

        if (!quickCapture) {
            return res.status(404).json({
                message: "Quick capture doesnt belong to the user"
            });
        }

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
                message: "The story doesn't belong to the user"
            });
        }

        const existingRelation = await prisma.quickCaptureStory.findFirst({
            where: {
                quickCaptureId_storyId: {
                    quickCaptureId: quickCapture.id,
                    storyId: story.id
                }
            }
        });

        if(existingRelation) {
            return res.status(409).json({
                message: "Relation already exists"
            });
        }

        const relation = await prisma.quickCaptureStory.create({
            data: {
                quickCaptureId: quickCapture.id,
                storyId: story.id
            }
        });

        return res.status(201).json(relation);

    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Unable to create the relationship"
        });
    }
};

export const getQuickStoriesController = async (req, res) => {
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
                message: "quick capture doesn't belong to the user"
            });
        }

        const relation = await prisma.quickCaptureStory.findMany({
            where:{
                    quickCaptureId: quickCapture.id
                }
        });

        if (relation.length === 0) {
            return res.status(404).json({
                message: "No relationship exists for this quick capture"
            });
        }

        return res.status(200).json(relation);

    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Couldn't get the relations"
        });
    }
};

export const deleteQuickStoryController = async (req, res) => {
    try{
        const { quickCaptureId, storyId } = req.body;

        const quickCapture = await prisma.quickCapture.findFirst({
            where: {
                id: quickCaptureId,
                userId: req.user.id
            }
        });

        if (!quickCapture) {
            return res.status(404).json({
                message: "quick capture doesn't belong to the user"
            });
        }

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
                message: "story does not belong to the user"
            });
        }

        const relationship = await prisma.quickCaptureStory.findUnique({
            where: {
                quickCaptureId_storyId: {
                    quickCaptureId: quickCapture.id,
                    storyId: story.id
                }
            }
        });

        if (!relationship) {
            return res.status(404).json({
                message: "The relationship does not exist or belong to the user"
            });
        }

        const relDelete = await prisma.quickCaptureStory.delete({
            where: {
                    quickCaptureId_storyId: {
                        quickCaptureId: quickCapture.id,
                        storyId: story.id
                }
            }
        });

        return res.status(200).json({
            message: "Relation deleted successfully"
        });

    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Couldn't delete the relationship"
        });
    }
} ;