import Order from "../models/Order.js";

export const createOrder = async (orderData) => {
  try {
    const newOrder = new Order(orderData);
    await newOrder.save();
    return newOrder;
  } catch (error) {
    throw new Error("Failed to create order: " + error.message);
  }
};


export const getOrders = async () => {
  const orders = await Order.find();
  if (orders.length === 0) throw new Error("No orders found");
  return orders;
};

export const getOrder = async (orderId) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");
  return order;
};

export const updateOrder = async (orderId, orderData) => {
  const updated = await Order.findByIdAndUpdate(orderId, orderData, { new: true });
  if (!updated) throw new Error("Order not found");
  return updated;
};

export const deleteOrder = async (orderId) => {
  const deleted = await Order.findByIdAndDelete(orderId);
  if (!deleted) throw new Error("Order not found");
  return deleted;
};
