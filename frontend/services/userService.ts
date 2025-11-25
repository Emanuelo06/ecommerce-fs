import axios from "axios";
import User from "../types/User";
import { API_BASE_URL } from "./apiConfig";
import { authHeaders } from "./authHeaders";

const API_URL = `${API_BASE_URL}/users`;

export const getUser = async (userId: string, token: string) =>
  axios.get(`${API_URL}/${userId}`, authHeaders(token)).then((res) => res.data);

export const updateUser = async (
  userId: string,
  data: Partial<User>,
  token: string
) =>
  axios
    .put(`${API_URL}/${userId}`, data, authHeaders(token))
    .then((res) => res.data);

export const deleteUser = async (userId: string, token: string) =>
  axios
    .delete(`${API_URL}/${userId}`, authHeaders(token))
    .then((res) => res.data);

