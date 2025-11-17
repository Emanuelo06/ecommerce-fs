import express from "express"
import isAdmin from "../middlewares/isAdmin.js"
const router = express.Router()

router.get("/", productsController.getProducts)
router.get("/:id", productsController.getProduct)
router.post("/",isAdmin, productsController.createProduct)
router.put("/:id",isAdmin, productsController.updateProduct)
router.delete("/:id",isAdmin, productsController.deleteProduct)