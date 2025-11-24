/**
 * @swagger
 * /payments/webhook:
 *   post:
 *     summary: Stripe webhook endpoint (for payment events)
 *     tags: [Payments]
 *     description: |
 *       This endpoint receives webhook events from Stripe.
 *       It handles payment_intent.succeeded events and creates orders automatically.
 *       **Note:** This endpoint should be configured in Stripe Dashboard.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             description: Stripe webhook event payload
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 received:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Webhook signature verification failed
 *       500:
 *         description: Webhook handling failed
 */

/**
 * @swagger
 * /payments/create-payment-intent:
 *   post:
 *     summary: Create a Stripe payment intent for the user's cart
 *     tags: [Payments]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Creates a Stripe PaymentIntent based on the items in the user's cart.
 *       The payment intent is used to process the payment on the frontend.
 *       After successful payment, Stripe sends a webhook to create the order.
 *     responses:
 *       200:
 *         description: Payment intent created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 clientSecret:
 *                   type: string
 *                   description: Client secret for Stripe payment confirmation
 *                   example: "pi_1234567890_secret_abcdef"
 *       400:
 *         description: Cart is empty or validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Not authenticated
 */

