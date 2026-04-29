import { body, validationResult } from "express-validator"
import { type Request, type Response, type NextFunction } from "express"

export const validateProduct = [
    body("name").notEmpty().withMessage("name is required"),
    body("price").notEmpty().withMessage("price is required"),
    body("description").notEmpty().withMessage("description is required"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({
                message: "validation failed",
                errors: errors.array()
            })
        }
        next()
    }
]