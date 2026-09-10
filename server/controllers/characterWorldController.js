import prisma from "../lib/prisma.js";

export const addCharacterToWorld = async (req, res) => {
    try {
        const world = await prisma.world.findFirst({
            where: {
                id: req.params.worldId,
                userId: req.user.id
            }
        });
        const character = await prisma.character.findFirst({
            where: {
                id: req.params.characterId,
                userId: req.user.id
            }
        });

        if (!world || !character) {
            return res.status(404).json({
                message: "The Character or World does not belong to the User"
            });
        }

        const relationship = await prisma.worldCharacter.create({
            data: {
                worldId: world.id,
                characterId: character.id
            }
        });
        
        return res.status(201).json(relationship);
    
    } catch (error) {
        console.error(error);
        
        return res.status(500).json({
            message: "Couldn't create the relationship"
        });
    }
};


export const getCharacterWorldRelationship = async (req, res) => {
        try {
            const rel = await prisma.worldCharacter.findFirst({

                where: {

                    worldId: req.params.worldId,
                    characterId: req.params.characterId,

                    world: {
                        userId: req.user.id
                    }
                }
            });

            if (!rel) {
                return res.status(404).json({
                    message: "Relationship not found"
                });
            }

            return res.status(200).json(rel);

    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not get the relationship"
        });
    }
};

export const getCharacters = async (req, res) => {
    try {
        const world = await prisma.world.findFirst({
            where: {
                id: req.params.worldId,
                userId: req.user.id,
            }
            });


        if (!world) {
            return res.status(404).json({ 
                message: "World not found"
            });
        }
        const characters = await prisma.worldCharacter.findMany({
            where: {
                worldId: world.id
            },
            include: {
                character: true
            }
        });
        return res.status(200).json(characters)

    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Couldn't find the relations"
        });
    }
};

export const getWorlds = async (req, res) => {
    try {
        const character = await prisma.character.findFirst({
            where: {
                id: req.params.characterId,
                userId: req.user.id,
            }
        }); 

        if (!character) {
            return res.status(404).json({
                message: "Character not found"
            });
        }

        const worlds = await prisma.worldCharacter.findMany({
            where: {
                characterId: character.id
            },
            include: {
                world: true
            }
        });

        return res.status(200).json(worlds);
    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Couldn't find the relation"
        });
    }
}

export const deleteCharacterToWorld = async (req, res) => {
    try {
        const world = await prisma.world.findFirst({
            where: {
                id: req.params.worldId,
                userId: req.user.id
            }
        });

        const character = await prisma.character.findFirst({
            where: {
                id: req.params.characterId,
                userId: req.user.id
            }
        });

        if (!world || !character) {
            return res.status(404).json({
                message: "The Character or World does not belong to the user"
            });
        }

        await prisma.worldCharacter.delete({
            where: {
                worldId_characterId: {
                    characterId: character.id,
                    worldId: world.id
                }
            }
        });
        return res.status(200).json({
            message: "Relationship deleted successfully"
        });
    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not delete the relationship"
        });
    }
};

