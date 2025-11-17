import express from "express";
import * as productController from "../controllers/productController.js";
import * as userController from "../controllers/userController.js";
import * as orderController from "../controllers/orderController.js";
const router = express.Router();

//admin product routes
router.get("/products", productController.getProducts);
router.get("/products/:id", productController.getProduct);
router.post("/products", productController.createProduct);
router.put("/products/:id", productController.updateProduct);
router.delete("/products/:id", productController.deleteProduct);

// admin user routes
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);

// admin order routes
router.get("/orders", orderController.getOrders);
router.get("/orders/:id", orderController.getOrder);
router.put("/orders/:id/status", orderController.updateOrderStatus);

export default router;