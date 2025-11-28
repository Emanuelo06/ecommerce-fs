import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import User from "../types/User";
import { AuthResponse } from "../types/api";
import { apiClient } from "../lib/apiClient";

interface LoginPayload {
  email: string;
  password: string;
}

interface RegisterPayload {
  username: string;
  email: string;
  password: string;
}

type AuthResult = AuthResponse<User>;

export const useLoginMutation = (
  options?: UseMutationOptions<AuthResult, Error, LoginPayload>
) =>
  useMutation({
    mutationFn: (payload) =>
      apiClient<AuthResult>({
        url: "/auth/login",
        method: "POST",
        data: payload,
      }),
    ...options,
  });

export const useRegisterMutation = (
  options?: UseMutationOptions<AuthResult, Error, RegisterPayload>
) =>
  useMutation({
    mutationFn: (payload) =>
      apiClient<AuthResult>({
        url: "/auth/register",
        method: "POST",
        data: payload,
      }),
    ...options,
  });

