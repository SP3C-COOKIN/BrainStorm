import prisma from "../lib/prisma.js";

// CREATE POWER

export const createPower = async (req, res) => {
    try {
        const power = await prisma.power.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                userId: req.user.id
            }
        });

        return res.status(201).json(power);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not create the power"
        });
    }
};


// GET ALL POWERS

export const getPowers = async (req, res) => {
    try {
        const powers = await prisma.power.findMany({
            where: {
                userId: req.user.id
            }
        });

        return res.status(200).json(powers);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not get the powers"
        });
    }
};


// GET ONE POWER

export const getPower = async (req, res) => {
    try {
        const power = await prisma.power.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!power) {
            return res.status(404).json({
                message: "Power not found"
            });
        }

        return res.status(200).json(power);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not get the power"
        });
    }
};


// EDIT POWER

export const editPower = async (req, res) => {
    try {
        const power = await prisma.power.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!power) {
            return res.status(404).json({
                message: "Power not found"
            });
        }

        const editedPower = await prisma.power.update({
            where: {
                id: power.id
            },
            data: req.body
        });

        return res.status(200).json(editedPower);
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not edit the power"
        });
    }
};


// DELETE POWER

export const deletePower = async (req, res) => {
    try {
        const power = await prisma.power.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!power) {
            return res.status(404).json({
                message: "Power not found"
            });
        }

        await prisma.power.delete({
            where: {
                id: power.id
            }
        });

        return res.status(200).json({
            message: "Power deleted successfully"
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not delete the power"
        });
    }
};

