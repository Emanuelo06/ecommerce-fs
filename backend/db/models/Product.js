import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true, default: 1 },
  images: [{ type: String }],
  attributes: [{
    name: { type: String, required: true }, // e.g., "Color"
    values: [{ type: String, required: true }] // e.g., ["Red", "Blue"]
  }],
  variants: [{
    name: { type: String, required: true }, // e.g., "Red / 128GB"
    price: { type: Number, required: true },
    stock: { type: Number, required: true, default: 0 },
    attributes: { type: Map, of: String }, // e.g., { "Color": "Red", "Storage": "128GB" }
    sku: { type: String }
  }],
  createdAt: { type: Date, default: Date.now }
});

const Product = mongoose.model('Product', ProductSchema);
export default Product; // ✅ default export
