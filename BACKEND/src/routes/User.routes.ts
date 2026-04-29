import { Router } from "express";
import { register } from "../controllers/user.controller.js";
import { validateRegister } from "../validators/auth.validator.js";
import { login } from "../controllers/user.controller.js";
import { handleGoogle, getMe } from "../controllers/user.controller.js";
import passport from "passport";
const router = Router()


router.post("/register", validateRegister, register)
router.post("/login", login)
router.get("/me", getMe)
router.get("/google",
    passport.authenticate("google", {
        session: false,
        scope: ["profile", "email"]   //when user click on this button it will redirect to the google auth page
    }));

router.get("/google/callback",
    passport.authenticate("google", {
        session: false,
        failureRedirect: "/login"
    }), handleGoogle
)

export default router