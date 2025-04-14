import { Router } from "express";
import { getCategories } from "../controllers/categoryController.js";

const categoryRouter = new Router();

categoryRouter.get("/", getCategories)

export default categoryRouter