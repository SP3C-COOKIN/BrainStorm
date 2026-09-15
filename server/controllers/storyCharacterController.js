import prisma from "../lib/prisma.js";

export const addStoryCharacter = async (req, res) => {

    try {

        const { storyId, characterId } = req.body;

        const story = await prisma.story.findFirst({
            where: {
                id: storyId,
                world: {
                    userId: req.user.id
                }
            }
        });

        const character = await prisma.character.findFirst({
            where: {
                id: characterId,
                userId: req.user.id
            }
        });

        if (!story || !character) {
            return res.status(404).json({
                message: "Could not find the story or character"
            });
        }

        const existingRelationship = await prisma.storyCharacter.findUnique({
            where: {
                storyId_characterId: {
                    storyId,
                    characterId
                }
            }
        });

        if (existingRelationship) {
            return res.status(409).json({
                message: "Story-character relationship already exists"
            });
        }

        const relationship = await prisma.storyCharacter.create({
            data: {
                storyId: story.id,
                characterId: character.id
            }
        });

        return res.status(201).json(relationship);

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Couldn't create the story-character relationship"
        });

    }

};


export const getStoryCharacter = async (req, res) => {
    try {
        const { storyId, characterId } = req.query;

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

            const characters = await prisma.storyCharacter.findMany({
                where: {
                    storyId
                },
                include: {
                    character: true
                }
            });

            return res.status(200).json(characters);
        }

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

            const stories = await prisma.storyCharacter.findMany({
                where: {
                    characterId
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
            message: "Could not get story character"
        });
    }
};

export const deleteStoryCharacter = async (req, res) => {
    try {
        const { storyId, characterId } = req.params;

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

        const relationship = await prisma.storyCharacter.findUnique({
            where: {
                storyId_characterId: {
                    storyId,
                    characterId
                }
            }
        });

        if (!relationship) {
            return res.status(404).json({
                message: "Story-character relationship not found"
            });
        }

        await prisma.storyCharacter.delete({
            where: {
                storyId_characterId: {
                    storyId,
                    characterId
                }
            }
        });

        return res.status(200).json({
            message: "Story-character relationship deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not delete story-character relationship"
        });
    }
};

