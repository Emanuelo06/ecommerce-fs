import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import { apiClient } from "../lib/apiClient";

type PaymentIntentVariables = {
  token: string;
};

type PaymentIntentResult = {
  clientSecret: string;
};

export const useCreatePaymentIntentMutation = (
  options?: UseMutationOptions<PaymentIntentResult, Error, PaymentIntentVariables>
) =>
  useMutation({
    mutationFn: ({ token }) =>
      apiClient<PaymentIntentResult>({
        url: "/payments/create-payment-intent",
        method: "POST",
        token,
      }),
    ...options,
  });

