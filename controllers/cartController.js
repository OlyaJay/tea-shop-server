import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const getCart = async (req, res) => {
    const userId = req.userId;

    try {
        const cart = await prisma.cart.findMany({
            where: {
                userId: Number(userId),
            },
            include: {
                product: true,
            }
        })
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: "Error server"});
    }
}

export const addToCart = async (req, res) => {
    const userId = req.userId;
    const {productId, quantity} = req.body

    try {
        const firstItem = await prisma.cart.findFirst({
            where: {
                userId,
                productId
            }
        })

        if(firstItem) {
            const updateItem = await prisma.cart.update({
                where: {
                    id: firstItem.id
                },
                data: {
                    quantity: firstItem.quantity + Number(quantity)
                }
            })
            return res.status(200).json(updateItem)
        }
        const newItem = await prisma.cart.create({
            data: {userId, productId, quantity: Number(quantity)}
        })
        res.status(201).json(newItem)
    } catch (error) {
        res.status(400).json({ error: "Error add"});
    }
}

export const deleteFromCart = async (req, res) => {
    const cartItem = Number(req.params.id)
    try {
        await prisma.cart.delete({
            where: {id: cartItem}
        })
        res.status(200).json({message: "Product delete"})
    } catch (error) {
        res.status(400).json({error: "Error delete"})
    }
}

export const deleteCart = async (req, res) => {
    const userId = req.user.id

    try {
        await prisma.cart.deleteMany({
            where: {userId}
        })
        res.status(200).json({message: "Delete cart"})
    } catch (error) {
        res.status(400).json({error: "Error delete cart"})
    }
}