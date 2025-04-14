import { Router } from "express";
import { createNewProduct, deleteProduct, filterProducts, getProduct, getProductById, searchProducts, updProduct } from "../controllers/productController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

const productRouter = new Router();

productRouter.get("/", getProduct)
productRouter.get('/search', searchProducts)
productRouter.get('/filter', filterProducts)
productRouter.get("/:id", getProductById)
productRouter.post("/create", authMiddleware, adminMiddleware, createNewProduct)
productRouter.post("/up/:id", authMiddleware, adminMiddleware, updProduct)
productRouter.post("/delete/:id", authMiddleware, adminMiddleware, deleteProduct)

export default productRouter