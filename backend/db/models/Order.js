import mongoose from "mongoose";

const OrderSchema = mongoose.Schema({
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
      variant: {
        name: String,
        price: Number,
        attributes: { type: Map, of: String }
      },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  shippingInfo: {
    username: String,
    email: String,
    phoneNumber: String,
    address: String,
  },
  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ["pending", "paid", "processing", "shipped", "delivered", "cancelled", "refunded"], default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

const Order = mongoose.model("Order", OrderSchema);
export default Order;  
