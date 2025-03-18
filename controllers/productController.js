import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getProduct = async (req, res) =>{
    try {
        const products = await prisma.product.findMany()
        res.json(products)
    } catch (error) {
        res.status(500).json({error: "Error server"})
    }
}

export const getProductById = async (req, res) =>{
    const id = req.params.id

    try {
        const product = await prisma.product.findUnique({
            where: {id: Number(id)}
        })
        if(!product){
            return res.status(404).json({error: "No item"})
        } 
        res.json(product)
    } catch (error) {
        res.status(500).json({error: "Error server"})
    }
}

export const createNewProduct = async (req, res) => {
    const {product_name, product_desctiption, price, product_image} = req.body
    
    try {
        const product = await prisma.product.create({
            data: { product_name, product_desctiption, price: Number(price), product_image}
        })
        res.status(200).json(product)
    } catch (error) {
        res.status(400).json({error: "Error create product"})
    }
}

export const updProduct = async (req, res) => {
    const id = req.params.id
    const {product_name, product_desctiption, price, product_image} = req.body

    try {
        const product = await prisma.product.update({
            where: {id: Number(id)},
            data: {product_name, product_desctiption, price: Number(price), product_image}
        })
        res.json(product)
    } catch (error){
        res.status(400).json({error: "Error update"})
    }
}

export const deleteProduct = async (req, res) =>{
    const id = req.params.id

    try {
        await prisma.product.delete({
            where: {id:Number(id)}
        })
        res.json({message:"Product delete"})
    } catch (error) {
        res.status(400).json({error: "Error delete"})
    }
}

