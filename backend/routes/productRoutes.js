import express from "express"
import { z } from "zod"
import { isAdmin } from "../middlewares/isAdmin.js"
import { isAuth } from "../middlewares/isAuth.js"
import { validate } from "../middlewares/validate.js"
import * as productController from "../controllers/productController.js"
import { createProductSchema } from "../validation/productValidation.js"
import { updateProductSchema } from "../validation/productValidation.js"
import uploadRoutes from "./uploadRoutes.js"
const router = express.Router()

const productIdParamSchema = z.object({
  id: z.string().length(24, "Invalid MongoDB ObjectId")
});

router.get("/", productController.queryProducts)
router.get("/:id", validate(productIdParamSchema, "params"), productController.getProduct)
router.post("/", isAuth, isAdmin, validate(createProductSchema), productController.createProduct)
router.put("/:id", isAuth, isAdmin, validate(productIdParamSchema, "params"), validate(updateProductSchema), productController.updateProduct)
router.delete("/:id", isAuth, isAdmin, validate(productIdParamSchema, "params"), productController.deleteProduct)

// Mount upload routes for product images
router.use("/:id", uploadRoutes)

export default router