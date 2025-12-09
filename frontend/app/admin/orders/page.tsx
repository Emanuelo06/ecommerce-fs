"use client";

import { useOrdersQuery } from "@/services/orderQueries";
import { useAuth } from "@/context/auth-context";
import Order from "@/types/Order";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Loader2, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function AdminOrdersPage() {
    const { token } = useAuth();
    const { data, isLoading, error } = useOrdersQuery(token || "", {
        limit: 50
    }, {
        enabled: !!token
    });

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return <div className="p-8 text-red-500">Error loading orders: {error.message}</div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-3xl font-bold tracking-tight">Orders</h2>
            </div>

            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Order ID</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Total Amount</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.orders?.map((order: Order) => (
                            <TableRow key={order._id || order.id}>
                                <TableCell className="font-medium">{order._id.substring(0, 8)}...</TableCell>
                                <TableCell>
                                    <Badge variant={order.status === 'delivered' ? 'default' : 'secondary'}>
                                        {order.status}
                                    </Badge>
                                </TableCell>
                                <TableCell>${order.totalPrice || order.totalAmount || "0.00"}</TableCell>
                                <TableCell>{order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "N/A"}</TableCell>
                                <TableCell className="text-right">
                                    <Button variant="ghost" size="icon">
                                        <Eye className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                        {(!data?.orders || data.orders.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">
                                    No orders found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
