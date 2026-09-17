import prisma from "../lib/prisma.js"

export const addCharacterPower = async (req, res) => {
    try {
        const { storyId, characterId, powerId } = req.body;
        
        const character = await prisma.character.findFirst({
            where: {
                id: characterId,
                userId: req.user.id
            }
        });

        const power = await prisma.power.findFirst({
            where: {
                id: powerId,
                userId: req.user.id
            }
        });

        const story = await prisma.story.findFirst({
            where: {
                id: storyId,
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

        const existing = await prisma.storyCharacterPower.findUnique({
            where: {
                storyId_characterId_powerId: {
                    storyId: story.id,
                    characterId: character.id,
                    powerId: power.id
                }
            }
        });

        if (existing) {
            return res.status(409).json({ message: "Relationship already exists" });
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
        const { storyId, characterId, powerId } = req.validatedQuery;

        // Scenario 1: Fetching by Story ID
        if (storyId) {
            const story = await prisma.story.findFirst({
                where: {
                    id: storyId,
                    world: { userId: req.user.id }
                }
            });

            if (!story) {
                return res.status(404).json({ message: "Story not found" });
            }

            const storyPowers = await prisma.storyCharacterPower.findMany({
                where: { storyId },
                include: { character: true, power: true }
            });

            return res.status(200).json(storyPowers);
        }

        // Scenario 2: Fetching by Character ID
        if (characterId) {
            const character = await prisma.character.findFirst({
                where: {
                    id: characterId,
                    userId: req.user.id
                }
            });

            if (!character) {
                return res.status(404).json({ message: "Character not found" });
            }

            const characterPowers = await prisma.storyCharacterPower.findMany({
                where: { characterId },
                include: { power: true, story: true }
            });

            return res.status(200).json(characterPowers);
        }

        // Scenario 3: Fetching by Power ID
        if (powerId) {
            const power = await prisma.power.findFirst({
                where: {
                    id: powerId,
                    userId: req.user.id
                }
            });

            if (!power) {
                return res.status(404).json({ message: "Power not found" }); 
            }

            const powerCharacters = await prisma.storyCharacterPower.findMany({
                where: { powerId }, 
                include: { character: true, story: true }
            });

            return res.status(200).json(powerCharacters);
        }

        // Fallback
        return res.status(400).json({ message: "Provide storyId, characterId, or powerId" });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Could not get character powers"
        });
    }
};

export const deleteCharacterPower = async (req, res) => {
    try {
        // FIX: Ensure existence before attempting to delete to prevent Prisma 500 error
        const { storyId, characterId, powerId } = req.params;

        const existing = await prisma.storyCharacterPower.findUnique({
            where: {
                storyId_characterId_powerId: { storyId, characterId, powerId }
            }
        });

        if (!existing) {
            return res.status(404).json({ message: "Character power relationship not found" });
        }

        await prisma.storyCharacterPower.delete({
            where: {
                storyId_characterId_powerId: { storyId, characterId, powerId }
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