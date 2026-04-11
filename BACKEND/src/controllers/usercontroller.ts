import { type Request, type Response } from "express";
import UserModel, { type User } from "../models/userschema.js";
import jwt from "jsonwebtoken"
import config from "../config/config.js"
import bcrypt from "bcrypt"

export async function register(req: Request, res: Response) {
    const { fullname, email, password, role }: User = req.body
    const isExist = await UserModel.findOne({ email })
    if (isExist) {
        return res.status(400).json({
            message: "user is already exixts",
            success: false
        })
    }
    const user = await UserModel.create({
        fullname,
        email,
        password,
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
    const { email, password }: User = req.body
    const user = await UserModel.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: "user is not exixts",
            success: false
        })
    }
    const passwordIsvalid = bcrypt.compare(password, user.password)
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
