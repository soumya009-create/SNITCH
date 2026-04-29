import { type Request, type Response } from "express";
import ProductModel from "../models/productschema.js";
import { type AuthRequest } from "../middlewares/product.middleware.js";
import { uploadFile } from "../services/storage.service.js";
import config from "../config/config.js"
import jwt from "jsonwebtoken"

export async function CreateProduct(req: Request, res: Response) {
    try {
        const { name, price, description } = req.body;

        const user = (req as AuthRequest).user;
        const files = req.files as Express.Multer.File[];
        const images = await Promise.all(files.map(async (file: any) => {
            return await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname
            })






        }))

        const product = await ProductModel.create({
            name: name,
            seller: user._id,
            price: {
                amount: price,
                currency: "INR"
            },
            description: description,
            images: images
        });

        res.status(201).json({
            success: true,
            message: "product is created successfully",
            product
        });

    } catch (err) {
        res.status(500).json({ error: err });
    }
}

export async function getAllProducts(req: Request, res: Response) {
    try {
        const token = req.cookies.token
        const decodedToken = jwt.verify(token, config.JWT_SECRET) as jwt.JwtPayload & { id: string }
        const products = await ProductModel.find({
            seller: decodedToken.id
        })
        res.status(200).json({
            success: true,
            message: "products are fetched successfully",
            products
        })
    } catch (err) {
        res.status(500).json({ error: err })
    }
}

export async function getEveryProduct(req: Request, res: Response) {
    try {
        const products = await ProductModel.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            message: "All products fetched successfully",
            products
        });
    } catch (err) {
        res.status(500).json({ error: err });
    }
}