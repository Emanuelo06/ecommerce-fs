import axios from 'axios';
const API_URL = "https://localhost:5000/products";
import  Product  from '../types/Product';

export const getAllProducts = async () => axios.get(API_URL).then(response => response.data);
export const getProductById = async (productId: string) => axios.get(`${API_URL}/${productId}`).then(response => response.data);
export const createProduct = async (productData: Product )=> axios.post(API_URL, productData).then(response => response.data);
export const updateProduct = async (productId: string, productData: Partial<Product>) => axios.put(`${API_URL}/${productId}`, productData).then(response => response.data);
export const deleteProduct = async (productId: string) => axios.delete(`${API_URL}/${productId}`).then(response => response.data);