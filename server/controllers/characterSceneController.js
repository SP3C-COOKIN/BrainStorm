import prisma from "../lib/prisma.js";

export const addCharacterToScene = async (req, res) => {
    try {
        const { characterId, sceneId } = req.body;

        const character = await prisma.character.findFirst({
            where: {
                id: characterId,
                userId: req.user.id
            }
        });

        if (!character) {
            return res.status(404).json({
                message: "Character not found"
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

        const existingRelationship = await prisma.characterScene.findUnique({
            where: {
                characterId_sceneId: {
                    characterId,
                    sceneId
                }
            }
        });

        if (existingRelationship) {
            return res.status(409).json({
                message: "Character-scene relationship already exists"
            });
        }

        const relationship = await prisma.characterScene.create({
            data: {
                characterId: character.id,
                sceneId: scene.id
            }
        });

        return res.status(201).json(relationship);

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Couldn't create character-scene relationship"
        });
    }
};

export const getCharacterScene = async (req, res) => {
    try {
        const { characterId, sceneId } = req.validatedQuery;

        if (characterId) {
            const character = await prisma.character.findFirst({
                where: {
                    id: characterId,
                    userId: req.user.id
                }
            });

            if (!character) {
                return res.status(404).json({
                    message: "Character not found"
                });
            }

            const scenes = await prisma.characterScene.findMany({
                where: {
                    characterId
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

            const characters = await prisma.characterScene.findMany({
                where: {
                    sceneId
                },
                include: {
                    character: true
                }
            });

            return res.status(200).json(characters);
        }

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Could not get character-scene relationships"
        });
    }
};

export const deleteCharacterScene = async (req, res) => {
    try {
        const { characterId, sceneId } = req.params;

        const character = await prisma.character.findFirst({
            where: {
                id: characterId,
                userId: req.user.id
            }
        });

        if (!character) {
            return res.status(404).json({
                message: "Character not found"
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

        const relationship = await prisma.characterScene.findUnique({
            where: {
                characterId_sceneId: {
                    characterId,
                    sceneId
                }
            }
        });

        if (!relationship) {
            return res.status(404).json({
                message: "Character-scene relationship not found"
            });
        }

        await prisma.characterScene.delete({
            where: {
                characterId_sceneId: {
                    characterId,
                    sceneId
                }
            }
        });

        return res.status(200).json({
            message: "Character-scene relationship deleted successfully"
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Could not delete character-scene relationship"
        });
    }
};