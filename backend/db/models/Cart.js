import mongoose from "mongoose";

const cartItemSchema = mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
  quantity: { type: Number, required: true, min: 1 },
  priceSnapshot: { type: Number, required: true }, // save price at moment of add
});

const cartSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", unique: true },
  items: [cartItemSchema],
  total: { type: Number, default: 0 },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart