import jwt from 'jsonwebtoken'
import config from '../config/config.js'
import { type NextFunction, type Request, type Response } from 'express'
import UserModel from '../models/userschema.js'
import { type User } from "../models/userschema.js"

export interface AuthRequest extends Request {
    user: User
}

export async function authenticateSeller(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(400).json({ message: "token is not available" });
        }

        const decoded = jwt.verify(token, config.JWT_SECRET) as jwt.JwtPayload & { id: string };

        const user = await UserModel.findById(decoded.id);

        if (!user) {
            return res.status(400).json({ message: "user is not available" });
        }

        if (user.role !== "seller") {
            return res.status(400).json({
                message: "user is not authorized to create product"
            });
        }

        (req as AuthRequest).user = user; // ✅ safe cast here

        next();
    } catch (err) {
        next(err); // ✅ don't throw
    }
}