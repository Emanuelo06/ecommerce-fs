"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldCheck, User as UserIcon, MapPin, Package } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProfilePage() {
    const { user, isAuthenticated, isLoading, logout } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            router.push("/login");
        }
    }, [isLoading, isAuthenticated, router]);

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="container max-w-4xl py-10 space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">User Settings</h1>
                    <p className="text-muted-foreground">
                        Manage your account settings and preferences.
                    </p>
                </div>
                {user.role === "admin" && (
                    <Link href="/admin">
                        <Button className="gap-2">
                            <ShieldCheck className="h-4 w-4" />
                            Admin Dashboard
                        </Button>
                    </Link>
                )}
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* User Profile Card */}
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <UserIcon className="h-6 w-6 text-primary" />
                        </div>
                        <div className="grid gap-1">
                            <CardTitle>Personal Information</CardTitle>
                            <CardDescription>Your contact details</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <div className="grid gap-1">
                            <span className="font-medium">Username</span>
                            <span className="text-muted-foreground">{user.username}</span>
                        </div>
                        <div className="grid gap-1">
                            <span className="font-medium">Email</span>
                            <span className="text-muted-foreground">{user.email}</span>
                        </div>
                        <div className="grid gap-1">
                            <span className="font-medium">Account Type</span>
                            <span className="capitalize text-muted-foreground">{user.role}</span>
                        </div>
                        <Button variant="outline" className="w-full mt-2" onClick={logout}>
                            Log out
                        </Button>
                    </CardContent>
                </Card>

                {/* Addresses Card Placeholder */}
                <Card>
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <MapPin className="h-6 w-6 text-primary" />
                        </div>
                        <div className="grid gap-1">
                            <CardTitle>Address Book</CardTitle>
                            <CardDescription>Manage your shipping addresses</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 text-sm">
                        <p className="text-muted-foreground">
                            {user.address || "No address saved."}
                        </p>
                        <Button variant="secondary" className="w-full">Edit Address</Button>
                    </CardContent>
                </Card>

                {/* Orders Card Placeholder */}
                <Card className="md:col-span-2">
                    <CardHeader className="flex flex-row items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <Package className="h-6 w-6 text-primary" />
                        </div>
                        <div className="grid gap-1">
                            <CardTitle>Order History</CardTitle>
                            <CardDescription>View your recent orders</CardDescription>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-muted-foreground text-center py-8">
                            No orders found.
                        </p>
                        <Link href="/products" className="block text-center">
                            <Button variant="link">Start Shopping</Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
