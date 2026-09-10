import prisma from "../lib/prisma.js";

export const createChapter = async (req, res) => {
    try {
        
        const world = await prisma.world.findFirst({
            where: {
                id: req.params.worldId,
                userId: req.user.id
            }
        });

        if (!world) {
            return res.status(404).json({
                message: "World does not belong to the user"
            });
        };
        

        const story = await prisma.story.findFirst({
            where: {
                id: req.params.storyId,
                worldId: world.id 
                }
            }); 

        if (!story) {
             return res.status(404).json({
              message: "Story not found"}); 
            };
            

        const lastChapter = await prisma.chapter.findFirst({
            where: {
                storyId: story.id 
            },

            orderBy: {
                order: "desc" 
            } 
        });

        const order = lastChapter ? lastChapter.order + 1 : 1;

        const chapter = await prisma.chapter.create({
            data: {
                title: req.body.title,
                content: req.body.content,
                order,
                storyId: req.params.storyId
            }
        });

    } catch(error) { 
        console.error(error)

        return res.status(500).json({
            message: "Couldn't create the chapter"
        });
    }
};

export const getChapter = async (req, res) => {
    try {
        const world = await prisma.world.findFirst({
            where: {
                id: req.params.worldId,
                userId: req.user.id
            }
        });

        if (!world) {
            return res.status(404).json({
                message: "World does not belong to the user"
            });
        }

        const story = await prisma.story.findFirst({
            where: {
                id: req.params.storyId,
                worldId: world.id
            }
        });

        if (!story) {
            return res.status(404).json({
                message: "Story does not belong to the world"
            });
        }

        const chapter = await prisma.chapter.findFirst({
            where: {
                id: req.params.chapterId,
                storyId: story.id
            }
        });

        if (!chapter) {
            return res.status(404).json({
                message: "Chapter does not belong to the story"
            });
        }

        return res.status(200).json(chapter);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not get the chapter"
        });
    }
};

export const getChapters = async (req, res) => {
    try {
        const world = await prisma.world.findFirst({
            where: {
                id: req.params.worldId,
                userId: req.user.id
            }
        });

        if (!world) {
            return res.status(404).json({
                message: "World does not belong to the user"
            });
        }

        const story = await prisma.story.findFirst({
            where: {
                id: req.params.storyId,
                worldId: world.id
            }
        });

        if (!story) {
            return res.status(404).json({
                message: "Story does not belong to the world"
            });
        }

        const chapters = await prisma.chapter.findMany({
            where: {
                storyId: story.id
            },
            orderBy: {
                order: "asc"
            }
        });

        return res.status(200).json(chapters);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not get the chapters"
        });
    }
};

export const editChapter = async (req, res) => {
    try {
        const world = await prisma.world.findFirst({
            where: {
                id: req.params.worldId,
                userId: req.user.id
            }
        });

        if (!world) {
            return res.status(404).json({
                message: "World does not belong to the user"
            });
        }

        const story = await prisma.story.findFirst({
            where: {
                id: req.params.storyId,
                worldId: world.id
            }
        });

        if (!story) {
            return res.status(404).json({
                message: "Story does not belong to the world"
            });
        }

        const chapter = await prisma.chapter.findFirst({
            where: {
                id: req.params.chapterId,
                storyId: story.id
            }
        });

        if (!chapter) {
            return res.status(404).json({
                message: "Chapter does not belong to the story"
            });
        }

        const editedChapter = await prisma.chapter.update({
            where: {
                id: chapter.id
            },
            data: req.body
        });

        return res.status(200).json(editedChapter);

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not edit the chapter"
        });
    }
};

export const deleteChapter = async (req, res) => {
    try {
        const world = await prisma.world.findFirst({
            where: {
                id: req.params.worldId,
                userId: req.user.id
            }
        });

        if (!world) {
            return res.status(404).json({
                message: "World does not belong to the user"
            });
        }

        const story = await prisma.story.findFirst({
            where: {
                id: req.params.storyId,
                worldId: world.id
            }
        });

        if (!story) {
            return res.status(404).json({
                message: "Story does not belong to the world"
            });
        }

        const chapter = await prisma.chapter.findFirst({
            where: {
                id: req.params.chapterId,
                storyId: story.id
            }
        });

        if (!chapter) {
            return res.status(404).json({
                message: "Chapter does not belong to the story"
            });
        }

        await prisma.chapter.delete({
            where: {
                id: chapter.id
            }
        });

        return res.status(200).json({
            message: "Chapter deleted successfully"
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Could not delete the chapter"
        });
    }
};