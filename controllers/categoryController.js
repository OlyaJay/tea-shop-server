import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const getCategories = async (req, res) => {
    try {
        const categories = await prisma.category.findMany()

        res.json(categories)
    } catch (error) {
        res.status(500).json({error: "Error get categories"})
    }
}

