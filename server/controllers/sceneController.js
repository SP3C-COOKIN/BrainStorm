import prisma from "../lib/prisma.js";
import express from "express";

export const createScene = async (req, res) => {

    const userId = req.user.id;
    try {
        const scene = await prisma.scene.create({
            data: {
                name: req.body.name,
                description: req.body.description,
                user: {
                    connect: {
                        id: userId
                    }
                }
            }
        });

        return res.status(201).json(scene);
    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not create Scene"
        });
    }
}

export const getScene = async (req, res) => {
    try {
        const scene = await prisma.scene.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!scene) {
            return res.status(404).json({
                message: "Scene not found"
            });
        }

        return res.status(200).json(scene);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not get the scene"
        });
    }
};

export const getScenes = async (req, res) => {
    try {
        const scene = await prisma.scene.findMany({
            where: {
                userId: req.user.id
            }
        });

        return res.status(200).json(scene);

    } catch(error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not get the scene"
        });
    }
};

export const editScene = async (req, res) => {
    try {
        const scene = await prisma.scene.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!scene) {
            return res.status(404).json({
                message: "Scene not found"
            });
        }

        const editedScene = await prisma.scene.update({
            where: {
                id: scene.id
            },
            data: req.body
        });

        return res.status(200).json(editedScene);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not edit the scene"
        });
    }
};

export const deleteScene = async (req, res) => {
    try {
        const scene = await prisma.scene.findFirst({
            where: {
                id: req.params.id,
                userId: req.user.id
            }
        });

        if (!scene) {
            return res.status(404).json({
                message: "Scene not found"
            });
        }

        await prisma.scene.delete({
            where: {
                id: scene.id
            }
        });

        return res.status(200).json({
            message: "Scene deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not delete the scene"
        });
    }
};