const mongoose = require('mongoose');
const OrderSchema = mongoose.Schema({
  products: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    quantity: { type: Number, required: true, default: 1 }
  }],
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

  // snapshot of user's info at the time of order
  shippingInfo: {
    username: String,
    email: String,
    phoneNumber: String,
    address: String
  },

  totalAmount: { type: Number, required: true },
  status: { type: String, enum: ['pending', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', OrderSchema);
module.exports = Order;