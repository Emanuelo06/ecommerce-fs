import Order from "../db/models/Order.js";

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

export const cancelOrder = async (orderId, userId, isAdmin = false) => {
  const order = await Order.findById(orderId);
  if (!order) throw new Error("Order not found");

  if (!isAdmin && order.userId.toString() !== userId) {
    throw new Error("Not allowed to cancel this order");
  }

  if (order.status === "shipped" || order.status === "delivered") {
    throw new Error("Cannot cancel an order that is already shipped or delivered");
  }

  order.status = "cancelled";
  await order.save();
  return order;
};


export const queryOrders =  async (query, userId = null, isAdmin = false) => {
  const page = Math.max(1, Number(query.page) || 1);
  const maxLimit = 100;
  const defaultLimit = 10;
  const limit = Math.min(maxLimit, Math.max(1, Number(query.limit) || defaultLimit));
  const skip = (page - 1) * limit;

  const filters = {};
  
  // Non-admin users can only see their own orders
  if (!isAdmin && userId) {
    filters.userId = userId;
  }
  
  if (query.status) {
    filters.status = query.status;
  }

  if(query.minPrice || query.maxPrice){
    filters.totalAmount = {};
    if(query.minPrice){
      filters.totalAmount.$gte = Number(query.minPrice);
    }
    if(query.maxPrice){
      filters.totalAmount.$lte = Number(query.maxPrice);
    }
  }

  if(query.from ||  query.to){
    filters.createdAt = {};
    if(query.from){
      filters.createdAt.$gte = new Date(query.from);
    }
    if(query.to){
      filters.createdAt.$lte = new Date(query.to);
    }
  }

  let sort = {};
  if(query.sort){
    const order = query.order === "asc" ? 1 : -1;
    sort[query.sort] = order;
  } else {
    sort.createdAt = -1;
  }

  const orders = await Order.find(filters)
    .sort(sort)
    .skip(skip)
    .limit(limit);

  const total = await Order.countDocuments(filters);

  return {
    orders,
    page,
    totalPages: Math.ceil(total / limit),
    total,
    limit,
    results: orders.length
  };
  
}