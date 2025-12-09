"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Package, ShoppingCart, DollarSign, Loader2 } from "lucide-react";
import { useProductsQuery } from "@/services/productQueries";
import { useAdminUsersQuery } from "@/services/userQueries";
import { useOrdersQuery } from "@/services/orderQueries";
import { useAuth } from "@/context/auth-context";
import Order from "@/types/Order";
// Removed unused imports

export default function AdminDashboardPage() {
    const { token } = useAuth();

    // We fetch with limit 1 just to get the 'total' metadata if the API supports it.
    // If API doesn't return total in metadata for paginated calls, we might see 0 or need a different approach.
    // Based on types, it returns { total, ... }.

    const { data: productsData, isLoading: productsLoading } = useProductsQuery({ limit: 1 });
    const { data: usersData, isLoading: usersLoading } = useAdminUsersQuery(token || "", { limit: 1 });
    // For orders, we fetch a larger batch to calculate revenue manually since we don't have a stats endpoint.
    const { data: ordersData, isLoading: ordersLoading } = useOrdersQuery(token || "", { limit: 1000 });

    const totalRevenue = ordersData?.orders?.reduce((acc: number, order: Order) => acc + (order.totalPrice || order.totalAmount || 0), 0) || 0;
    const totalOrders = ordersData?.total || 0;
    const totalProducts = productsData?.total || 0;
    const totalUsers = usersData?.total || 0;

    // Use a unified loading state or minimal loading to avoid flickering
    const isLoading = productsLoading || usersLoading || ordersLoading;

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">${totalRevenue.toFixed(2)}</div>
                        <p className="text-xs text-muted-foreground">Lifetime revenue</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalOrders}</div>
                        <p className="text-xs text-muted-foreground">Total orders placed</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Products</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalProducts}</div>
                        <p className="text-xs text-muted-foreground">Active products</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{totalUsers}</div>
                        <p className="text-xs text-muted-foreground">Registered customers</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Overview</CardTitle>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                            Chart visualization coming soon
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Orders</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8 max-h-[300px] overflow-y-auto">
                            {ordersData?.orders?.length === 0 ? (
                                <p className="text-sm text-muted-foreground">No orders yet.</p>
                            ) : (
                                ordersData?.orders?.slice(0, 5).map((order: Order) => (
                                    <div className="flex items-center" key={order._id}>
                                        <div className="ml-4 space-y-1">
                                            <p className="text-sm font-medium leading-none">Order #{order._id.substring(0, 8)}</p>
                                            <p className="text-sm text-muted-foreground">{order.status}</p>
                                        </div>
                                        <div className="ml-auto font-medium">+${order.totalPrice.toFixed(2)}</div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
