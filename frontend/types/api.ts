export interface PaginationMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  results?: number;
}

export interface ListResponse<TItem> extends PaginationMeta {
  items: TItem[];
}

export interface ProductListResponse<TItem> extends PaginationMeta {
  products: TItem[];
}

export interface OrderListResponse<TItem> extends PaginationMeta {
  orders: TItem[];
}

export interface UsersListResponse<TItem> extends PaginationMeta {
  users: TItem[];
}

export interface MessageResponse {
  message: string;
}

export interface AuthResponse<TUser> {
  token: string;
  user: TUser;
}

