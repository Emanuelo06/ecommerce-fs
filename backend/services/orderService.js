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
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");
  Object.assign(order, orderData);
  await order.save();
  return order;
};


export const deleteOrder = async (orderId) => {
  const deleted = await Order.findByIdAndDelete(orderId);
  if (!deleted) throw new Error("Order not found");
  return deleted;
};
