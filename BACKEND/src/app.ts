import dotenv from "dotenv"
dotenv.config()
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRouter from "./routes/UserRoute.js"
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(morgan("dev"))
app.use('/api/user', userRouter)



export default app