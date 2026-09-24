import prisma from "../lib/prisma.js";

export const devSceneController = async (req, res) => {
    try {
        const { quickCaptureId } = req.params;

        const quickCapture = await prisma.quickCapture.findFirst({
            where: {
                id: quickCaptureId,
                userId: req.user.id
            },
            include: {
                quickCaptureWorlds: true,
                quickCaptureStories: true
            }
        });

        if (!quickCapture) {
            return res.status(404).json({
                message: "Quick capture doesn't exist or belong to the user"
            });
        }

        if (quickCapture.type !== "SCENE") {
            return res.status(400).json({
                message: "This quick capture is not a scene capture"
            });
        }

        if (quickCapture.archived) {
            return res.status(400).json({
                message: "This quick capture has already been developed"
            });
        }

        const scene = await prisma.scene.create({
            data: {
                name: quickCapture.name,
                description: quickCapture.description,
                userId: req.user.id
            }
        });

        await prisma.sceneWorld.createMany({
            data: quickCapture.quickCaptureWorlds.map((world) => ({
                worldId: world.worldId,
                sceneId: scene.id,
                userId: req.user.id
            }))
        });

        await prisma.storyScene.createMany({
            data: quickCapture.quickCaptureStories.map((story) => ({
                storyId: story.storyId,
                sceneId: scene.id,
                userId: req.user.id
            }))
        });

        await prisma.quickCapture.update({
            where: {
                id: quickCaptureId
            },
            data: {
                archived: true
            }
        });

        return res.status(200).json(scene);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Something went wrong"
        });
    }
};