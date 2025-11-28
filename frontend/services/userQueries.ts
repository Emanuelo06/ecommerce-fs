import {
  useMutation,
  useQuery,
  useQueryClient,
  UseMutationOptions,
  UseQueryOptions,
} from "@tanstack/react-query";
import User from "../types/User";
import { UsersListResponse } from "../types/api";
import { apiClient } from "../lib/apiClient";

const userKeys = {
  all: ["users"] as const,
  profile: (userId: string) => ["users", "profile", userId] as const,
  adminList: (params?: UserQueryParams) => ["admin", "users", params] as const,
};

export interface UserQueryParams
  extends Record<string, string | number | boolean | undefined> {
  page?: number;
  limit?: number;
  search?: string;
  sort?: "newest" | "oldest" | "a-z" | "z-a";
}

type AdminUsersResponse = UsersListResponse<User>;

const fetchUser = (userId: string, token: string) =>
  apiClient<User>({
    url: `/users/${userId}`,
    method: "GET",
    token,
  });

const fetchUsersAsAdmin = (token: string, params?: UserQueryParams) =>
  apiClient<AdminUsersResponse>({
    url: "/admin/users",
    method: "GET",
    token,
    params,
  });

export const useUserQuery = (
  userId: string,
  token: string,
  options?: UseQueryOptions<User, Error>
) =>
  useQuery({
    queryKey: userKeys.profile(userId),
    queryFn: () => fetchUser(userId, token),
    enabled: Boolean(userId && token),
    ...options,
  });

export const useAdminUsersQuery = (
  token: string,
  params?: UserQueryParams,
  options?: UseQueryOptions<AdminUsersResponse, Error>
) =>
  useQuery({
    queryKey: userKeys.adminList(params),
    queryFn: () => fetchUsersAsAdmin(token, params),
    enabled: Boolean(token),
    ...options,
  });

type UpdateUserVariables = {
  userId: string;
  data: Partial<User>;
  token: string;
};

type DeleteUserVariables = {
  userId: string;
  token: string;
};

export const useUpdateUserMutation = (
  options?: UseMutationOptions<User, Error, UpdateUserVariables>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, data, token }) =>
      apiClient<User>({
        url: `/users/${userId}`,
        method: "PUT",
        data,
        token,
      }),
    onSuccess: async (data, variables, context, mutation) => {
      await options?.onSuccess?.(data, variables, context, mutation);
      queryClient.invalidateQueries({
        queryKey: userKeys.profile(variables.userId),
      });
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    ...options,
  });
};

export const useDeleteUserMutation = (
  options?: UseMutationOptions<void, Error, DeleteUserVariables>
) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ userId, token }) =>
      apiClient<void>({
        url: `/users/${userId}`,
        method: "DELETE",
        token,
      }),
    onSuccess: async (data, variables, context, mutation) => {
      await options?.onSuccess?.(data, variables, context, mutation);
      queryClient.invalidateQueries({ queryKey: userKeys.all });
    },
    ...options,
  });
};

