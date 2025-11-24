import express from "express";
import { validate } from "../middlewares/validate.js";
import {createOrderSchema}  from  "../validation/orderValidation.js"
import {updateOrderSchema} from "../validation/orderValidation.js";
import * as orderController from "../controllers/orderController.js";
import { z } from "zod";
import { isAdmin } from "../middlewares/isAdmin.js";
const router = express.Router();

const orderIdParamSchema = z.object({
  id: z.string().length(24, "Invalid MongoDB ObjectId")
});

router.get("/:id",validate(orderIdParamSchema, "params"), orderController.getOrder);
router.get("/", orderController.queryOrders);
router.post("/", validate(createOrderSchema), orderController.createOrder);
router.put("/:id",isAdmin,validate(orderIdParamSchema, "params"),validate(updateOrderSchema), orderController.updateOrder);
router.delete("/:id",validate(orderIdParamSchema, "params"), orderController.deleteOrder);
router.put("/:id/cancel", validate(orderIdParamSchema, "params"), orderController.cancelOrder);

export default router;
