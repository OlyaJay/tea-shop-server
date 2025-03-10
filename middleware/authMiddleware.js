import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
    const token = req.cookies.token
    if(!token) {
        return res.status(401).json({message: "User not auth"})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.userId = decoded.userId
        next()
    } catch (error) {
        res.status(403).json({error: "Bad token"})
    }
}