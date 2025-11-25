import axios from 'axios';
import User from '../types/User';
const API_URL = "https://localhost:5000/auth";

interface LoginData {
    password: string;
    email: string;
}
interface RegisterData {
    username: string;
    password: string;
    email: string;
}


export const login = async (data: LoginData) : Promise<{ token: string; user: User }> => {
  const res = await axios.post(`${API_URL}/login`, data);
  return res.data; 
};

export const register = async (data: RegisterData): Promise<{ token: string; user: User }>=> {
  const res = await axios.post(`${API_URL}/register`, data);
  return res.data; 
};