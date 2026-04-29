import { Router, type RequestHandler } from "express";
import { CreateProduct, getAllProducts, getEveryProduct } from "../controllers/product.controller.js";
import { authenticateSeller } from "../middlewares/product.middleware.js";
import multer from "multer";
import { validateProduct } from "../validators/product.validators.js";
const router = Router()

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

router.post('/create', upload.array("images", 7), authenticateSeller, validateProduct, CreateProduct)
router.get('/getproducts', getAllProducts)
router.get('/allproducts', getEveryProduct)

export default router
