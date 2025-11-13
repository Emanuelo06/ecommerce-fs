import express from "express"
const router = express.Router()

router.get("/", productsController.getProducts)
router.get("/:id", productsController.getProduct)
router.post("/", productsController.createProduct)
router.put("/:id", productsController.updateProduct)
router.delete("/:id", productsController.deleteProduct)