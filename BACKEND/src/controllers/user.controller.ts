import { type Request, type Response } from "express";
import UserModel, { type User } from "../models/userschema.js";
import jwt from "jsonwebtoken"
import config from "../config/config.js"
import bcrypt from "bcrypt"
import { type Profile } from "passport-google-oauth20"


export async function register(req: Request, res: Response) {
    const { fullname, email, password, role }: User = req.body
    const isExist = await UserModel.findOne({ email })
    if (isExist) {
        return res.status(400).json({
            message: "user is already exixts",
            success: false
        })
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await UserModel.create({
        fullname,
        email,
        password: hashedPassword,
        role
    })
    const token = jwt.sign({
        id: user._id
    }, config.JWT_SECRET, { expiresIn: "1d" })
    res.cookie("token", token)

    res.status(201).json({
        success: true,
        message: "user is registered successfully",
        user, token
    })

}


export async function login(req: Request, res: Response) {
    const { email, password } = req.body as {
        email: string;
        password: string;
    };
    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: "user is not exixts",
            success: false
        })
    }
    console.log("Entered password:", password);
    console.log("Stored hash:", user.password);
    const passwordIsvalid = await bcrypt.compare(password, user.password)
    if (!passwordIsvalid) {
        return res.status(400).json({
            message: "invalid password",
            success: false
        })
    }
    const token = jwt.sign({
        id: user._id
    }, config.JWT_SECRET, { expiresIn: "1d" })
    res.cookie("token", token)
    res.status(200).json({
        success: true,
        message: "user is logged in successfully",
        user, token
    })

}

export async function handleGoogle(req: Request, res: Response) {
    const { displayName, emails, photos } = req.user as Profile
    const fullname = displayName
    const email = emails?.[0]?.value
    const photo = photos?.[0]?.value
    const isExist = await UserModel.findOne({ email: email! })
    if (!isExist) {
        const user: User = await UserModel.create({
            fullname: fullname!,
            email: email!,
            provider: "google",
            role: "seller"
        })
        const token = jwt.sign({
            id: user._id
        }, config.JWT_SECRET, { expiresIn: "1d" })
        res.cookie("token", token)
    }
    else {
        const token = jwt.sign({
            id: isExist._id
        }, config.JWT_SECRET, { expiresIn: "1d" })
        res.cookie("token", token)
    }


    res.redirect("http://localhost:5173/dashboard")
}

export async function getMe(req: Request, res: Response) {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "Not authenticated", success: false });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET) as jwt.JwtPayload & { id: string };
        const user = await UserModel.findById(decoded.id).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found", success: false });
        }

        res.status(200).json({ success: true, user });
    } catch (err) {
        res.status(401).json({ message: "Invalid token", success: false });
    }
}