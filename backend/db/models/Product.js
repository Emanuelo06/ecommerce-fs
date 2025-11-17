import mongoose from "mongoose";

const ProductSchema = mongoose.Schema({
  title:{type: String, required:true},
  description:{type: String, required:true},
  price: {type: Number, required: true},
  category: {type: String, required: true},
  stock: {type: Number, required: true, default: 1},
  images: [{type: String}], 
  createdAt:{type:Date, default:Date.now}
});

const Product = mongoose.model('Product', ProductSchema);
export default Product; // ✅ default export
