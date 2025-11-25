import axios from 'axios';
import User from '../types/User';
import { API_BASE_URL } from './apiConfig';
const API_URL = `${API_BASE_URL}/auth`;

interface LoginData {
    password: string;
    email: string;
}
interface RegisterData {
    username: string;
    password: string;
    email: string;
}


export const login = async (
  data: LoginData
): Promise<{ token: string; user: User }> => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data;
};

export const register = async (
  data: RegisterData
): Promise<{ token: string; user: User }> => {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data;
};