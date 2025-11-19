import express from "express"
import {z} from "zod"
import {isAdmin} from "../middlewares/isAdmin.js"
import {validate} from "../middlewares/validate.js"
import * as productController from "../controllers/productController.js"
import {createProductSchema} from "../validation/productValidation.js"
import upload from "../middlewares/upload.js"
import { uploadProductImages } from "../controllers/uploadController.js"
import {updateProductSchema} from "../validation/productValidation.js"
const router = express.Router()

const productIdParamSchema = z.object({
  id: z.string().length(24, "Invalid MongoDB ObjectId")
});

router.get("/", productController.getProducts)
router.get("/:id",validate(productIdParamSchema, "params"), productController.getProduct)
router.post("/",isAdmin,validate(createProductSchema), productController.createProduct)
router.post("/:id/images",
  isAuth,
  isAdmin,
  upload.array("images",5),
  uploadProductImages 
),
router.put("/:id",isAdmin,validate(productIdParamSchema, "params"),validate(updateProductSchema), productController.updateProduct)
router.delete("/:id",isAdmin,validate(productIdParamSchema, "params"), productController.deleteProduct)

export default router