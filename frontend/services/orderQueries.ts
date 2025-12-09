import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import Order from "../types/Order";
import { OrderListResponse } from "../types/api";
import { apiClient } from "../lib/apiClient";

const orderKeys = {
  all: ["orders"] as const,
  list: (token?: string, params?: OrderQueryParams) =>
    ["orders", "list", token, params] as const,
  detail: (orderId: string) => ["orders", "detail", orderId] as const,
};

export interface OrderQueryParams {
  page?: number;
  limit?: number;
  status?:
  | "pending"
  | "paid"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled"
  | "refunded";
  minPrice?: number;
  maxPrice?: number;
  from?: string;
  to?: string;
  sort?: string;
  order?: "asc" | "desc";
}

type OrderListResult = OrderListResponse<Order>;

const fetchOrders = (token: string, params?: OrderQueryParams) =>
  apiClient<OrderListResult>({
    url: "/orders",
    method: "GET",
    token,
    params,
  });

const fetchOrder = (orderId: string, token: string) =>
  apiClient<Order>({
    url: `/orders/${orderId}`,
    method: "GET",
    token,
  });

export const useOrdersQuery = (
  token: string,
  params?: OrderQueryParams,
  options?: Omit<UseQueryOptions<OrderListResult, Error>, "queryKey" | "queryFn">
) =>
  useQuery({
    queryKey: orderKeys.list(token, params),
    queryFn: () => fetchOrders(token, params),
    enabled: Boolean(token),
    ...options,
  });

export const useOrderQuery = (
  orderId: string,
  token: string,
  options?: UseQueryOptions<Order, Error>
) =>
  useQuery({
    queryKey: orderKeys.detail(orderId),
    queryFn: () => fetchOrder(orderId, token),
    enabled: Boolean(orderId && token),
    ...options,
  });

type CreateOrderVariables = {
  data: any; // Using any for creation payload to allow simplified structure (e.g. product IDs instead of objects)
  token: string;
};

type UpdateOrderVariables = {
  orderId: string;
  data: Partial<Order>;
  token: string;
};

type DeleteOrderVariables = {
  orderId: string;
  token: string;
};

type CancelOrderVariables = {
  orderId: string;
  token: string;
};

export const useCreateOrderMutation = (
  options?: UseMutationOptions<Order, Error, CreateOrderVariables>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }) =>
      apiClient<Order>({
        url: "/orders",
        method: "POST",
        data,
        token,
      }),
    onSuccess: async (data, variables, context, mutation) => {
      await options?.onSuccess?.(data, variables, context, mutation);
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
    ...options,
  });
};

export const useUpdateOrderMutation = (
  options?: UseMutationOptions<Order, Error, UpdateOrderVariables>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, data, token }) =>
      apiClient<Order>({
        url: `/orders/${orderId}`,
        method: "PUT",
        data,
        token,
      }),
    onSuccess: async (data, variables, context, mutation) => {
      await options?.onSuccess?.(data, variables, context, mutation);
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      queryClient.invalidateQueries({
        queryKey: orderKeys.detail(variables.orderId),
      });
    },
    ...options,
  });
};

export const useDeleteOrderMutation = (
  options?: UseMutationOptions<void, Error, DeleteOrderVariables>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, token }) =>
      apiClient<void>({
        url: `/orders/${orderId}`,
        method: "DELETE",
        token,
      }),
    onSuccess: async (data, variables, context, mutation) => {
      await options?.onSuccess?.(data, variables, context, mutation);
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
    },
    ...options,
  });
};

export const useCancelOrderMutation = (
  options?: UseMutationOptions<Order, Error, CancelOrderVariables>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ orderId, token }) =>
      apiClient<Order>({
        url: `/orders/${orderId}/cancel`,
        method: "PUT",
        token,
      }),
    onSuccess: async (data, variables, context, mutation) => {
      await options?.onSuccess?.(data, variables, context, mutation);
      queryClient.invalidateQueries({ queryKey: orderKeys.all });
      queryClient.invalidateQueries({
        queryKey: orderKeys.detail(variables.orderId),
      });
    },
    ...options,
  });
};

