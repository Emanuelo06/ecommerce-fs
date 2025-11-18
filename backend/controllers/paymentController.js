import {createPaymentIntent, handleWebhookEvent} from "../services/paymentService.js";
import Stripe from "stripe";
import { paymentSchema } from "../validation/paymentValidation.js";

export const createPaymentIntentController = async(req, res, next) => {
    try{
        const userId = req.user.id;
        const paymentIntent = await createPaymentIntent(userId);

        res.status(200).json({
            clientSecret: paymentIntent.client_secret,
        });
    } catch(error) {
        next(error)
    }
};

export const stripeWebhookController = async (req, res) => {
    const sig = req.headers["stripe-signature"];

    let event;
    try{
        event = Stripe.webhooks.constructEvent(
            req.rawBody,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.log("Webhook signature verification failed.", err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    try{
        await handleWebhookEvent(event);
        res.status(200).json({received: true});
    } catch(err){
        res.status(500).send("Webhook handling failed");
    }
}
