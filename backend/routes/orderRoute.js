import express from "express";
import orderController from "../controllers/orderController.js";
const router = express.Router();

router.post("/", orderController.createOrder);
router.get("/:id", orderController.getOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);
router.get("/", orderController.getOrders);

export default router;