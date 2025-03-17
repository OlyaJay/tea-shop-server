import express from "express"
import dotenv from 'dotenv'
import cors from "cors"
import userRouter from "./routes/userRouter.js"
import productRouter from "./routes/productRouter.js"
import cookieParser from "cookie-parser"

dotenv.config()
const app =express()

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/users", userRouter)
app.use("/api/products", productRouter) 

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server running ${PORT}`));
