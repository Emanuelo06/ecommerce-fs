import express from "express";
import {createPaymentIntentController, stripeWebhookController} from "../controllers/paymentController.js"
import { isAuth } from "../middlewares/isAuth.js";
const router = express.Router();

router.post(
    "/webhook", 
    express.raw({type: "application/json"}),
    stripeWebhookController
);

router.post("/create-payment-intent", isAuth, createPaymentIntentController);

export default router