import axios from "axios";
import { authHeaders } from "./authHeaders";
import Order from "../types/Order";
import { API_BASE_URL } from "./apiConfig";
const API_URL = `${API_BASE_URL}/orders`;

export const getAllOrders = async (token: string) =>
  axios.get(API_URL, authHeaders(token)).then((res) => res.data);

export const getOrderById = async (orderId: string, token: string) =>
  axios
    .get(`${API_URL}/${orderId}`, authHeaders(token))
    .then((res) => res.data);

export const createOrder = async (data: Order, token: string) =>
  axios.post(API_URL, data, authHeaders(token)).then((res) => res.data);

export const updateOrder = async (orderId: string, data: Partial<Order>, token: string) =>
  axios
    .put(`${API_URL}/${orderId}`, data, authHeaders(token))
    .then((res) => res.data);

export const deleteOrder = async (orderId: string, token: string) =>
  axios
    .delete(`${API_URL}/${orderId}`, authHeaders(token))
    .then((res) => res.data);

export const cancelOrder = async (orderId: string, token: string) =>
  axios
    .put(`${API_URL}/${orderId}/cancel`, {}, authHeaders(token))
    .then((res) => res.data);