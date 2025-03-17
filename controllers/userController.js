import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const register = async (req, res) => {
    const { name, password, email } = req.body;

    try {

        const existUser = await prisma.user.findUnique({
            where: {email}
        })

        if (existUser) {
            return res.status(400).json({error: "Ëmail already exist !"})
        }

        const hashedPaword = await bcrypt.hash(password, 10)
        
        const user = await prisma.user.create({
            data: { name, email, password: hashedPaword },
        });

        res.json(user);
    } catch (error) {
        res.status(400).json({ error: "Èmail error" });
    }
};

export const login = async (req, res) => {
    const {email, password} = req.body

    const user = await prisma.user.findUnique({
        where: {email}
    })

    if(!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({error: 'error data' })
    }

    const token = jwt.sign({userId: user.id}, process.env.JWT_SECRET, {expiresIn: "1h"})

    res.cookie("token", token, {
        httpOnly: true,
        secure: false,
        sameSite: "lax",
        maxAge: 60 * 60 * 1000
    })
    res.json({message: "User already", user: {id: user.id, name: user.name, email: user.email, role: user.role}})
}

export const logout = (req, res) => { 
    res.clearCookie('token')
    res.json({message: "User logout"})
}
