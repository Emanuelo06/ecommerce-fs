"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/context/auth-context";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2, Search, Users } from "lucide-react";
import { useState } from "react";
import User from "@/types/User";

export default function AdminUsersPage() {
    const { token } = useAuth();
    const [search, setSearch] = useState("");

    const { data, isLoading, error } = useQuery({
        queryKey: ["admin", "users"],
        queryFn: () =>
            apiClient<{ users: User[] }>({
                url: "/admin/users",
                method: "GET",
                token: token || "",
            }),
        enabled: !!token,
    });

    const filteredUsers = data?.users?.filter(
        (user) =>
            user.username?.toLowerCase().includes(search.toLowerCase()) ||
            user.email?.toLowerCase().includes(search.toLowerCase())
    );

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return <div className="p-8 text-red-500">Error loading users: {(error as Error).message}</div>;
    }

    const customerCount = data?.users?.filter((u) => u.role === "costumer").length || 0;
    const adminCount = data?.users?.filter((u) => u.role === "admin").length || 0;

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
                <p className="text-muted-foreground">View customer information (read-only)</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-3">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{data?.users?.length || 0}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Customers</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{customerCount}</div>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Admins</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{adminCount}</div>
                    </CardContent>
                </Card>
            </div>

            {/* Search */}
            <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search by name or email..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Users Table */}
            <div className="border rounded-md">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Username</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Phone</TableHead>
                            <TableHead>Role</TableHead>
                            <TableHead>Joined</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {filteredUsers?.map((user) => (
                            <TableRow key={user._id}>
                                <TableCell className="font-medium">{user.username}</TableCell>
                                <TableCell>{user.email}</TableCell>
                                <TableCell>{user.phoneNumber || "—"}</TableCell>
                                <TableCell>
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.role === "admin"
                                            ? "bg-primary/10 text-primary"
                                            : "bg-muted text-muted-foreground"
                                            }`}
                                    >
                                        {user.role}
                                    </span>
                                </TableCell>
                                <TableCell className="text-muted-foreground">
                                    {user.createdAt
                                        ? new Date(user.createdAt).toLocaleDateString()
                                        : "—"}
                                </TableCell>
                            </TableRow>
                        ))}
                        {(!filteredUsers || filteredUsers.length === 0) && (
                            <TableRow>
                                <TableCell colSpan={5} className="text-center h-24">
                                    {search ? "No users found matching your search." : "No users found."}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Read-only Notice */}
            <Card className="border-primary/20 bg-primary/5">
                <CardHeader>
                    <CardTitle className="text-sm">Read-Only Mode</CardTitle>
                    <CardDescription>
                        This page displays customer information for viewing only. Editing and deleting users is restricted.
                    </CardDescription>
                </CardHeader>
            </Card>
        </div>
    );
}
