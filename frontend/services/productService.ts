import axios from 'axios';
import Product from '../types/Product';
import { API_BASE_URL } from './apiConfig';
import { authHeaders } from './authHeaders';

const API_URL = `${API_BASE_URL}/products`;

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: 'price-asc' | 'price-desc' | 'newest';
}

export const getAllProducts = async (params?: ProductQueryParams) =>
  axios.get(API_URL, { params }).then((response) => response.data);

export const getProductById = async (productId: string) =>
  axios.get(`${API_URL}/${productId}`).then((response) => response.data);

export const createProduct = async (productData: Product, token: string) =>
  axios.post(API_URL, productData, authHeaders(token)).then((response) => response.data);

export const updateProduct = async (
  productId: string,
  productData: Partial<Product>,
  token: string
) =>
  axios
    .put(`${API_URL}/${productId}`, productData, authHeaders(token))
    .then((response) => response.data);

export const deleteProduct = async (productId: string, token: string) =>
  axios
    .delete(`${API_URL}/${productId}`, authHeaders(token))
    .then((response) => response.data);