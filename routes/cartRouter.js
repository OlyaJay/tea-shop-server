import { Router } from "express";
import { addToCart, deleteCart, deleteFromCart, getCart } from "../controllers/cartController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const cartRouter = new Router()

cartRouter.get("/", authMiddleware, getCart)
cartRouter.post("/add", authMiddleware, addToCart)
cartRouter.delete("/delete/:id", authMiddleware, deleteFromCart)
cartRouter.delete("/delete", authMiddleware, deleteCart)

export default cartRouter