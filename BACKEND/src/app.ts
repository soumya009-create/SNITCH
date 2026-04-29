import dotenv from "dotenv"
dotenv.config()
import cors from "cors"
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import userRouter from "./routes/User.routes.js"
import ProductRouter from "./routes/Products.routes.js"
import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

app.use(morgan("dev"))
app.use(passport.initialize())
passport.use(new GoogleStrategy({
    clientID: process.env.CLIENT_ID!,
    clientSecret: process.env.CLIENT_SECRET!,
    callbackURL: process.env.CALLBACK_URL!
},
    (accessToken, refreshToken, profile, done) => {
        return done(null, profile)
    }
))
app.use('/api/user', userRouter)
app.use('/api/product', ProductRouter)





export default app