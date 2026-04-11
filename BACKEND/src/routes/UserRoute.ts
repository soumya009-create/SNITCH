import { Router } from "express";
import { register } from "../controllers/usercontroller.js";
import { validateRegister } from "../validators/auth.validator.js";
import { login } from "../controllers/usercontroller.js";
const router = Router()


router.post("/register", validateRegister, register)
router.post("/login", login)

export default router