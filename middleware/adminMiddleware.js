import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const adminMiddleware = async (req, res, next) => {
    const user = await prisma.user.findUnique({where: {id: req.userId}})
    if(!user || user.role !== "admin") {
        return res.status(403).json({error: "No role admin"})
    }

    next()
};