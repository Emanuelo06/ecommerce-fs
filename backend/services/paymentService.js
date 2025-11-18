import Stripe from "stripe";
import 'dotenv/config';
import Cart from "../db/models/Cart.js";
import Order from "../db/models/Order.js";
import { calculateTotal } from "./cartService.js";
import { addItemSchema } from "../validation/cartValidation.js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

/**
 * Create a Stripe PaymentIntent for the user's cart
 * @param {string} userId 
 */
export const createPaymentIntent = async (userId) => {
  const cart = await Cart.findOne({ userId }).populate("items.productId");

  if (!cart || cart.items.length === 0) {
    throw new Error("Your cart is empty.");
  }

  // Validate each cart item using your Zod schema
  cart.items.forEach(item => {
    addItemSchema.parse({
      productId: item.productId._id.toString(),
      quantity: item.quantity,
    });
  });

  const total = calculateTotal(cart);

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(total * 100), // in cents
    currency: "eur",
    metadata: {
      userId,
      cartId: cart._id.toString(),
    },
  });

  return paymentIntent;
};

/**
 * Handle Stripe webhook events
 * @param {object} event - The Stripe webhook event object
 */
export const handleWebhookEvent = async (event) => {
  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object;
      const userId = paymentIntent.metadata.userId;
      const cartId = paymentIntent.metadata.cartId;

      const cart = await Cart.findById(cartId).populate("items.productId");
      if (!cart) throw new Error("Cart not found for this payment");

      // Validate each item in the cart again before creating the order
      cart.items.forEach(item => {
        addItemSchema.parse({
          productId: item.productId._id.toString(),
          quantity: item.quantity,
        });
      });

      const order = await Order.create({
        userId,
        products: cart.items.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity
        })),
        totalAmount: calculateTotal(cart),
        status: "paid",
      });

      // Clear cart
      cart.items = [];
      cart.total = 0;
      await cart.save();

      return order;

    default:
      console.log(`Unhandled event type: ${event.type}`);
      return null;
  }
};
