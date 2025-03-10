import { Router } from "express";
import { login, logout, register } from "../controllers/userController.js";


const userRouter = new Router()

userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/logout', logout)

export default userRouter