import { Router } from "express";
import { createNewProduct, deleteProduct, getProduct, getProductById, updProduct } from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const productRouter = new Router();

productRouter.get("/", getProduct)
productRouter.get("/:id", getProductById)
productRouter.post("/create", authMiddleware, adminMiddleware, createNewProduct)
productRouter.post("/up/:id", authMiddleware, adminMiddleware, updProduct)
productRouter.post("/delete/:id", authMiddleware, adminMiddleware, deleteProduct)

export default productRouter