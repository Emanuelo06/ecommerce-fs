import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import Product from "../types/Product";
import { ProductListResponse } from "../types/api";
import { apiClient } from "../lib/apiClient";

const productKeys = {
  all: ["products"] as const,
  list: (params?: ProductQueryParams) => ["products", "list", params] as const,
  detail: (id: string) => ["products", "detail", id] as const,
};

export interface ProductQueryParams {
  page?: number;
  limit?: number;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  sort?: "price-asc" | "price-desc" | "newest";
}

type ProductListResult = ProductListResponse<Product>;

const fetchProducts = (params?: ProductQueryParams) =>
  apiClient<ProductListResult>({
    url: "/products",
    method: "GET",
    params,
  });

const fetchProduct = (productId: string) =>
  apiClient<Product>({
    url: `/products/${productId}`,
    method: "GET",
  });

export const useProductsQuery = (
  params?: ProductQueryParams,
  options?: UseQueryOptions<ProductListResult, Error>
) =>
  useQuery({
    queryKey: productKeys.list(params),
    queryFn: () => fetchProducts(params),
    ...options,
  });

export const useProductQuery = (
  productId: string,
  options?: UseQueryOptions<Product, Error>
) =>
  useQuery({
    queryKey: productKeys.detail(productId),
    queryFn: () => fetchProduct(productId),
    enabled: Boolean(productId),
    ...options,
  });

type CreateProductVariables = {
  data: Product;
  token: string;
};

type UpdateProductVariables = {
  productId: string;
  data: Partial<Product>;
  token: string;
};

type DeleteProductVariables = {
  productId: string;
  token: string;
};

export const useCreateProductMutation = (
  options?: UseMutationOptions<Product, Error, CreateProductVariables>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ data, token }) =>
      apiClient<Product>({
        url: "/products",
        method: "POST",
        data,
        token,
      }),
    onSuccess: async (data, variables, context, mutation) => {
      await options?.onSuccess?.(data, variables, context, mutation);
      queryClient.invalidateQueries({ queryKey: productKeys.all });
    },
    ...options,
  });
};

export const useUpdateProductMutation = (
  options?: UseMutationOptions<Product, Error, UpdateProductVariables>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, data, token }) =>
      apiClient<Product>({
        url: `/products/${productId}`,
        method: "PUT",
        data,
        token,
      }),
    onSuccess: async (data, variables, context, mutation) => {
      await options?.onSuccess?.(data, variables, context, mutation);
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.productId),
      });
    },
    ...options,
  });
};

export const useDeleteProductMutation = (
  options?: UseMutationOptions<void, Error, DeleteProductVariables>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ productId, token }) =>
      apiClient<void>({
        url: `/products/${productId}`,
        method: "DELETE",
        token,
      }),
    onSuccess: async (data, variables, context, mutation) => {
      await options?.onSuccess?.(data, variables, context, mutation);
      queryClient.invalidateQueries({ queryKey: productKeys.all });
      queryClient.invalidateQueries({
        queryKey: productKeys.detail(variables.productId),
      });
    },
    ...options,
  });
};

