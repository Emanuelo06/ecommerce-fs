import axios from "axios";
import { API_BASE_URL } from "./apiConfig";
import { authHeaders } from "./authHeaders";

const API_URL = `${API_BASE_URL}/payments`;

export const createPaymentIntent = async (token: string) =>
  axios
    .post(`${API_URL}/create-payment-intent`, {}, authHeaders(token))
    .then((res) => res.data);

