import prisma from "../lib/prisma.js"

export const addCharacterPower = async (req, res) => {
    try {

        const { storyId, characterId, powerId } = req.body;
        
        const character = await prisma.character.findFirst({
            where: {
                id: req.params.characterId,
                userId: req.user.id
            }
        });

        const power = await prisma.power.findFirst({
            where: {
                id: req.params.powerId,
                userId: req.user.id
            }
        });

        const story = await prisma.story.findFirst({
            where: {
                id: req.params.storyId,
                world: {
                    userId: req.user.id
                }
            }
        });

        if (!story || !power || !character) {
            return res.status(404).json({
                message: "Could not find the story, power or character"
            });
        }

        const relationship = await prisma.storyCharacterPower.create({  
            data: {
                storyId: story.id,
                characterId: character.id,
                powerId: power.id
            }
        });

        return res.status(201).json(relationship);

    } catch(error) {
        console.error(error);
        return res.status(500).json({
            message: "Couldn't create the reference"
        });
    }
};

export const getCharactersPowers = async (req, res) => {
    try {
        const { storyId, characterId, powerId } = req.query;

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
                message: "Story doesn't belong to the User"
            });
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
                message: "Couldn't find the character"
            });
        };

        const characterPowers =
            await prisma.storyCharacterPower.findMany({
                where: {
                    storyId,
                    characterId
                },
                include: {
                    power: true
                }
            });

        return res.status(200).json(characterPowers);
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
                    message: "power not found"
                }); 
            }

            const powerCharacters = await prisma.storyCharacterPower.findMany({
                where: {
                    storyId,
                    powerId,
                }, 
                include: {
                    character: true
                }
            });
            return res.status(200).json(powerCharacters);
        }

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not get character powers"
        });
    }
};

export const deleteCharacterPower = async (req, res) => {
    try {
        const relation = await prisma.storyCharacterPower.delete({
            where: {
                storyId_characterId_powerId: {
                storyId: req.params.storyId,
                characterId: req.params.characterId,
                powerId: req.params.powerId
            }
        }
        });
        return res.status(200).json({
            message: "Character power deleted successfully"
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not delete character power"
        });
    }
};