import prisma from "../lib/prisma.js";

export const createCharacter = async (req, res) => {
    try {

        const {
            name,
            description,
            age,
            gender,
            race,
            occupation,
            appearance,
            personality,
            interests,
            hobbies
        } = req.body;

        const character = await prisma.character.create({
            data: {
                name,
                description,
                age,
                gender,
                race,
                occupation,
                appearance,
                personality,
                interests,
                hobbies,
                userId: req.user.id
            },
        });
        return res.status(201).json(character);
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Failed to create the character.",
        });
    }
}

export const getCharacters = async (req, res) => {
    try {
        const characters = await prisma.character.findMany({
            where: {
                userId: req.user.id
            }
        });
        
        return res.status(200).json(characters);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Couldn't find your characters"
        });
    }
}

export const getCharacter = async (req, res) => {
    try {
    const character = await prisma.character.findFirst({
        where:  {
        id: req.params.id,
        userId: req.user.id
        }   
    });

    if (!character) {
    return res.status(404).json({
        message: "Character not found"
    });
    }

    return res.status(200).json(character);
} catch (error) {
    console.error(error);

    return res.status(500).json({
        message: "Couldn't find the character"
    });
    }
};

export const editCharacter = async (req, res) => {
    try {
        const character = await prisma.character.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id,
            }
        });

        if (!character) {
            return res.status(404).json({
                message: "Couldn't find the character"
            });
        }

        const editedCharacter = await prisma.character.update({
            where: {
                id: character.id,
            },

            data: {
                name: req.body.name,
                description: req.body.description,
                age: req.body.age,
                gender: req.body.gender,
                race: req.body.race,
                occupation: req.body.occupation,
                appearance: req.body.appearance,
                personality: req.body.personality,
                interests: req.body.interests,
                hobbies: req.body.hobbies,
            }
        });
        return res.status(200).json(editedCharacter);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Failed to edit the character"
        });
    }
}

export const deleteCharacter = async (req, res) => {

    try {

        const character = await prisma.character.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id,
            }
        });

        if (!character) {
            return res.status(404).json({
                message: "Couldn't find the character"
            });
        }

        if (character.quickCaptureId) {
            const quickCapture = await prisma.quickCapture.findFirst({
                where: {
                    id: character.quickCaptureId,
                    userId: req.user.id
                }
            });

            if (!quickCapture) {
                return res.status(404).json({
                    message: "couldn't find the quick capture"
                })
            }

            if (quickCapture) {
                await prisma.quickCapture.update({
                    where: {
                        id: quickCapture.id
                    },
                    data: {
                        archived: false
                    }
                });
            }
        };

        await prisma.character.delete({
            where: {
                id: character.id
            }
        });

        return res.status(200).json({
            message: "Character deleted successfully"
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            message: "Failed to delete the character"
        });
    }
};