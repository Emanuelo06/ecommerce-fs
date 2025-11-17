import express from 'express'
import { addItemSchema, updateItemSchema,mergeCartSchema, productIdParamSchema } from "../validation/cartValidation.js";
import {validate} from "../middlewares/validate.js"
import * as cartController from '../controllers/cartController.js';
const router = express.Router();

router.get("/", cartController.getCart);

router.post("/items", validate(addItemSchema), cartController.addToCart)
router.put("/items/:productId",  
    validate(productIdParamSchema, "params"), 
    validate(updateItemSchema), 
    cartController.updateCartItem
);
router.delete("/items/:productId",
    validate(productIdParamSchema, "params"),
    cartController.removeCartItem
);

router.post(
    "/merge",
    validate(mergeCartSchema), 
);

router.delete("/", cartController.clearCart);

export default router;