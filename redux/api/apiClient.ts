type GlobalWithProcess = typeof globalThis & {
  process?: {
    env?: Record<string, string | undefined>;
  };
};

const API_BASE_URL =
  ((globalThis as GlobalWithProcess).process?.env?.NEXT_PUBLIC_API_URL) ??
  "http://localhost:5000";

type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type QueryValue = string | number | boolean | null | undefined;
type QueryParams = Record<string, QueryValue>;

interface ApiClientOptions<TBody = unknown, TParams extends QueryParams = QueryParams> {
  method?: HttpMethod;
  body?: TBody;
  params?: TParams;
  token?: string;
  headers?: Record<string, string>;
}

export const apiClient = async <TResponse = unknown>(
  endpoint: string,
  { method = "GET", body, params, token, headers: customHeaders }: ApiClientOptions = {}
): Promise<TResponse> => {
  const url = new URL(`${API_BASE_URL}/${endpoint}`);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        url.searchParams.append(key, String(value));
      }
    });
  }

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    Accept: "application/json",
    ...customHeaders,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(url.toString(), {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    let errorMessage = "API request failed";
    try {
      const errorData = await response.json();
      errorMessage = errorData?.message ?? errorMessage;
    } catch { }
    throw new Error(errorMessage);
  }

  if (response.status === 204) {
    return null as TResponse;
  }

  return (await response.json()) as TResponse;
};