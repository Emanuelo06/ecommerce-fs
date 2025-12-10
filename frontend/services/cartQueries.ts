import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import Cart from "../types/Cart";
import { apiClient } from "../lib/apiClient";

const cartKeys = {
  root: ["cart"] as const,
};

const fetchCart = (token: string) =>
  apiClient<Cart>({
    url: "/cart",
    method: "GET",
    token,
  });

export const useCartQuery = (
  token: string,
  options?: UseQueryOptions<Cart, Error>
) =>
  useQuery({
    queryKey: cartKeys.root,
    queryFn: () => fetchCart(token),
    enabled: Boolean(token),
    ...options,
  });

type CartItemPayload = {
  productId: string;
  quantity: number;
  attributes?: Record<string, string>;
};

type TokenVariables = { token: string };

export const useAddItemToCartMutation = (
  options?: UseMutationOptions<Cart, Error, CartItemPayload & TokenVariables>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token, ...payload }) =>
      apiClient<Cart>({
        url: "/cart/items",
        method: "POST",
        data: payload,
        token,
      }),
    onSuccess: async (data, variables, context, mutation) => {
      await options?.onSuccess?.(data, variables, context, mutation);
      queryClient.invalidateQueries({ queryKey: cartKeys.root });
    },
    ...options,
  });
};

export const useUpdateCartItemMutation = (
  options?: UseMutationOptions<
    Cart,
    Error,
    { productId: string; quantity: number } & TokenVariables
  >
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, quantity, token }) =>
      apiClient<Cart>({
        url: `/cart/items/${productId}`,
        method: "PUT",
        data: { quantity },
        token,
      }),
    onSuccess: async (data, variables, context, mutation) => {
      await options?.onSuccess?.(data, variables, context, mutation);
      queryClient.invalidateQueries({ queryKey: cartKeys.root });
    },
    ...options,
  });
};

export const useRemoveCartItemMutation = (
  options?: UseMutationOptions<Cart, Error, { productId: string } & TokenVariables>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, token }) =>
      apiClient<Cart>({
        url: `/cart/items/${productId}`,
        method: "DELETE",
        token,
      }),
    onSuccess: async (data, variables, context, mutation) => {
      await options?.onSuccess?.(data, variables, context, mutation);
      queryClient.invalidateQueries({ queryKey: cartKeys.root });
    },
    ...options,
  });
};

export const useMergeCartMutation = (
  options?: UseMutationOptions<Cart, Error, { items: CartItemPayload[] } & TokenVariables>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ items, token }) =>
      apiClient<Cart>({
        url: "/cart/merge",
        method: "POST",
        data: { items },
        token,
      }),
    onSuccess: async (data, variables, context, mutation) => {
      await options?.onSuccess?.(data, variables, context, mutation);
      queryClient.invalidateQueries({ queryKey: cartKeys.root });
    },
    ...options,
  });
};

export const useClearCartMutation = (
  options?: UseMutationOptions<Cart, Error, TokenVariables>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ token }) =>
      apiClient<Cart>({
        url: "/cart",
        method: "DELETE",
        token,
      }),
    onSuccess: async (data, variables, context, mutation) => {
      await options?.onSuccess?.(data, variables, context, mutation);
      queryClient.invalidateQueries({ queryKey: cartKeys.root });
    },
    ...options,
  });
};

