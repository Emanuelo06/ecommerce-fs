import axios from "axios";
import Cart from "../types/Cart";
import { API_BASE_URL } from "./apiConfig";
import { authHeaders } from "./authHeaders";

const API_URL = `${API_BASE_URL}/cart`;

interface CartItemPayload {
  productId: string;
  quantity: number;
}

export const getCart = async (token: string): Promise<Cart> =>
  axios.get(API_URL, authHeaders(token)).then((res) => res.data);

export const addItemToCart = async (
  payload: CartItemPayload,
  token: string
) =>
  axios
    .post(`${API_URL}/items`, payload, authHeaders(token))
    .then((res) => res.data);

export const updateCartItem = async (
  productId: string,
  quantity: number,
  token: string
) =>
  axios
    .put(
      `${API_URL}/items/${productId}`,
      { quantity },
      authHeaders(token)
    )
    .then((res) => res.data);

export const removeCartItem = async (productId: string, token: string) =>
  axios
    .delete(`${API_URL}/items/${productId}`, authHeaders(token))
    .then((res) => res.data);

export const mergeCart = async (
  items: CartItemPayload[],
  token: string
) =>
  axios
    .post(`${API_URL}/merge`, { items }, authHeaders(token))
    .then((res) => res.data);

export const clearCart = async (token: string) =>
  axios.delete(API_URL, authHeaders(token)).then((res) => res.data);

