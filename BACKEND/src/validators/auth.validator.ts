import { body, validationResult } from "express-validator";
import { type Request, type Response, type NextFunction } from "express";

export const validateRegister = [
    body("fullname").notEmpty().withMessage("Fullname is required"),
    body("email").notEmpty().withMessage("Email is required"),
    body("password").notEmpty().isLength({ min: 6 }).withMessage("Password must be at least 6 characters long"),
    body("role").notEmpty().withMessage("Role is required"),
    (req: Request, res: Response, next: NextFunction) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        next()
    }
]