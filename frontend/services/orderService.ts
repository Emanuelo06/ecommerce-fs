import axios from 'axios';
const API_URL = "https://localhost:5000/orders";
import Order from '../types/Order';


export const getAllOrders = async () => axios.get(API_URL).then(response => response.data);
export const getOrderById = async (orderId: string ) => axios.get(`${API_URL}/${orderId}`).then(response => response.data);
export const createOrder = async (orderData : Order) => axios.post(API_URL, orderData).then(response => response.data);
export const updateOrder = async (orderId: string, orderData: Partial<Order>) => axios.put(`${API_URL}/${orderId}`, orderData).then(response => response.data);
export const deleteOrder = async (orderId: string) => axios.delete(`${API_URL}/${orderId}`).then(response => response.data);
export const cancelOrder = async (orderId: string) => axios.post(`${API_URL}/${orderId}/cancel`).then(response => response.data);