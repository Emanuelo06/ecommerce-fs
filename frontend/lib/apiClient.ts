import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000",
});

export interface ApiRequestConfig<TData = unknown>
  extends AxiosRequestConfig<TData> {
  token?: string;
}

export const apiClient = async <TResponse = unknown, TData = unknown>(
  config: ApiRequestConfig<TData>
): Promise<TResponse> => {
  const { token, ...rest } = config;

  const headers = {
    ...(rest.headers ?? {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await api.request<TResponse>({
    ...rest,
    headers,
  });

  return response.data;
};

