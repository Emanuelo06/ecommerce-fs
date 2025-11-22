import express from "express";
import { validate } from "../middlewares/validate.js";
import { z } from "zod";
import * as productController from "../controllers/productController.js";
import * as userController from "../controllers/userController.js";
import * as orderController from "../controllers/orderController.js";
import { createProductSchema, updateProductSchema } from "../validation/productValidation.js";
import { updateOrderSchema } from "../validation/orderValidation.js";

const router = express.Router();

const productIdParamSchema = z.object({
  id: z.string().length(24, "Invalid MongoDB ObjectId")
});

const userIdParamSchema = z.object({
  id: z.string().length(24, "Invalid MongoDB ObjectId")
});

const orderIdParamSchema = z.object({
  id: z.string().length(24, "Invalid MongoDB ObjectId")
});

//admin product routes
router.get("/products", productController.queryProducts);
router.get("/products/:id", validate(productIdParamSchema, "params"), productController.getProduct);
router.post("/products", validate(createProductSchema), productController.createProduct);
router.put("/products/:id", validate(productIdParamSchema, "params"), validate(updateProductSchema), productController.updateProduct);
router.delete("/products/:id", validate(productIdParamSchema, "params"), productController.deleteProduct);

// admin user routes
router.get("/users", userController.queryUsers);
router.get("/users/:id", validate(userIdParamSchema, "params"), userController.getUser);

// admin order routes
router.get("/orders", orderController.queryOrders);
router.get("/orders/:id", validate(orderIdParamSchema, "params"), orderController.getOrder);
router.put("/orders/:id/status", validate(orderIdParamSchema, "params"), validate(updateOrderSchema), orderController.updateOrderStatus);

export default router;