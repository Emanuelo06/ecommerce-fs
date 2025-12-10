"use client";

import { useAuth } from "@/context/auth-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Loader2, ShieldCheck, User as UserIcon, MapPin, Package, Mail, Phone, LogOut } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { EditPhoneDialog, EditAddressDialog, EditUsernameDialog, EditPasswordDialog } from "@/components/edit-profile-dialogs";

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
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (!user) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
            <div className="max-w-6xl mx-auto py-6 md:py-10 px-4 space-y-8">
                {/* Header Section */}
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div className="space-y-1">
                        <h1 className="text-2xl md:text-3xl font-bold tracking-tight">My Profile</h1>
                        <p className="text-sm md:text-base text-muted-foreground">
                            Manage your account settings and view your activity
                        </p>
                    </div>
                    {user.role === "admin" && (
                        <Link href="/admin" className="w-full sm:w-auto">
                            <Button className="gap-2 w-full sm:w-auto">
                                <ShieldCheck className="h-4 w-4" />
                                <span>Admin Dashboard</span>
                            </Button>
                        </Link>
                    )}
                </div>

                {/* Profile Overview Card */}
                <Card className="border-2">
                    <CardHeader className="pb-4">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                            <div className="flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-primary/10 ring-4 ring-primary/5">
                                <UserIcon className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                            </div>
                            <div className="flex-1 space-y-1">
                                <CardTitle className="text-xl md:text-2xl">{user.username}</CardTitle>
                                <CardDescription className="text-sm md:text-base flex items-center gap-2">
                                    <Mail className="h-4 w-4" />
                                    {user.email}
                                </CardDescription>
                                <div className="flex items-center gap-2 pt-1">
                                    <span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary capitalize">
                                        {user.role}
                                    </span>
                                </div>
                            </div>
                            <Button
                                variant="outline"
                                className="gap-2 w-full sm:w-auto mt-2 sm:mt-0"
                                onClick={logout}
                            >
                                <LogOut className="h-4 w-4" />
                                <span>Logout</span>
                            </Button>
                        </div>
                    </CardHeader>
                </Card>

                {/* Account Settings */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Username & Password */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <UserIcon className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">Account Security</CardTitle>
                                    <CardDescription className="text-xs">Update your credentials</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <Separator />
                        <CardContent className="pt-6 space-y-3">
                            <EditUsernameDialog currentUsername={user.username} />
                            <EditPasswordDialog />
                        </CardContent>
                    </Card>

                    {/* Phone Number */}
                    <Card>
                        <CardHeader>
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                    <Phone className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                    <CardTitle className="text-lg">Contact Information</CardTitle>
                                    <CardDescription className="text-xs">Phone number for contact</CardDescription>
                                </div>
                            </div>
                        </CardHeader>
                        <Separator />
                        <CardContent className="pt-6 space-y-4">
                            {user.phoneNumber ? (
                                <div className="rounded-lg bg-muted/50 p-4">
                                    <p className="text-sm font-medium text-muted-foreground mb-1">Phone Number</p>
                                    <p className="text-base font-semibold">{user.phoneNumber}</p>
                                </div>
                            ) : (
                                <div className="rounded-lg border-2 border-dashed p-8 text-center">
                                    <Phone className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
                                    <p className="text-sm text-muted-foreground">No phone number</p>
                                </div>
                            )}
                            <EditPhoneDialog currentPhone={user.phoneNumber} />
                        </CardContent>
                    </Card>
                </div>

                {/* Shipping Address */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <MapPin className="h-5 w-5 text-primary" />
                            </div>
                            <div className="flex-1">
                                <CardTitle className="text-lg">Shipping Address</CardTitle>
                                <CardDescription className="text-xs">Default delivery location</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6 space-y-4">
                        {user.address ? (
                            <div className="rounded-lg bg-muted/50 p-4">
                                <p className="text-sm leading-relaxed">{user.address}</p>
                            </div>
                        ) : (
                            <div className="rounded-lg border-2 border-dashed p-8 text-center">
                                <MapPin className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
                                <p className="text-sm text-muted-foreground">No address saved</p>
                                <p className="text-xs text-muted-foreground mt-1">Add your shipping address</p>
                            </div>
                        )}
                        <EditAddressDialog currentAddress={user.address} />
                    </CardContent>
                </Card>

                {/* Order History */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                                <Package className="h-5 w-5 text-primary" />
                            </div>
                            <div>
                                <CardTitle className="text-lg">Order History</CardTitle>
                                <CardDescription className="text-xs">Track your recent purchases</CardDescription>
                            </div>
                        </div>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        <div className="rounded-lg border-2 border-dashed p-8 md:p-12 text-center">
                            <Package className="mx-auto h-12 w-12 text-muted-foreground/50 mb-3" />
                            <p className="text-base font-medium mb-1">No orders yet</p>
                            <p className="text-sm text-muted-foreground mb-4">
                                Start shopping to see your order history here
                            </p>
                            <Link href="/products">
                                <Button className="gap-2">
                                    <Package className="h-4 w-4" />
                                    Browse Products
                                </Button>
                            </Link>
                        </div>
                    </CardContent>
                </Card >
            </div >
        </div >
    );
}
