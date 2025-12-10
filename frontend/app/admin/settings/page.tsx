"use client";

import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useAuth } from "@/context/auth-context";
import { useUpdateUserMutation } from "@/services/userQueries";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";

export default function SettingsPage() {
    const { user, token, updateUserData } = useAuth();
    const { mutate: updateUser, isPending } = useUpdateUserMutation();

    //Profile state
    const [username, setUsername] = useState(user?.username || "");
    const [email, setEmail] = useState(user?.email || "");
    const [password, setPassword] = useState("");

    // Notification settings
    const [emailNotifications, setEmailNotifications] = useState(true);
    const [orderAlerts, setOrderAlerts] = useState(true);

    const handleUpdateProfile = (e: React.FormEvent) => {
        e.preventDefault();

        if (!user || !token) return;

        const updates: any = {
            username,
            email,
        };

        if (password) {
            updates.password = password;
        }

        updateUser(
            { userId: user._id, data: updates, token },
            {
                onSuccess: (updatedUser) => {
                    updateUserData(updatedUser);
                    toast.success("Profile updated successfully");
                    setPassword("");
                },
                onError: (error: any) => {
                    toast.error("Failed to update profile", {
                        description: error?.response?.data?.message || error.message,
                    });
                },
            }
        );
    };

    const handleSaveNotifications = () => {
        // Save to localStorage for now
        localStorage.setItem("emailNotifications", String(emailNotifications));
        localStorage.setItem("orderAlerts", String(orderAlerts));
        toast.success("Notification preferences saved");
    };

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
                <p className="text-muted-foreground">Manage your admin account and preferences</p>
            </div>

            {/* Profile Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Profile Settings</CardTitle>
                    <CardDescription>Update your admin account information</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleUpdateProfile} className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="username">Username</Label>
                                <Input
                                    id="username"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password">New Password (leave blank to keep current)</Label>
                            <Input
                                id="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                            />
                        </div>

                        <Button type="submit" disabled={isPending} className="gap-2">
                            {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                            <Save className="h-4 w-4" />
                            Save Profile
                        </Button>
                    </form>
                </CardContent>
            </Card>

            {/* Notification Settings */}
            <Card>
                <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                    <CardDescription>Configure how you receive updates</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="email-notifications">Email Notifications</Label>
                            <p className="text-sm text-muted-foreground">
                                Receive email updates about orders and products
                            </p>
                        </div>
                        <Switch
                            id="email-notifications"
                            checked={emailNotifications}
                            onCheckedChange={setEmailNotifications}
                        />
                    </div>

                    <Separator />

                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <Label htmlFor="order-alerts">Order Alerts</Label>
                            <p className="text-sm text-muted-foreground">
                                Get notified when new orders are placed
                            </p>
                        </div>
                        <Switch
                            id="order-alerts"
                            checked={orderAlerts}
                            onCheckedChange={setOrderAlerts}
                        />
                    </div>

                    <Button onClick={handleSaveNotifications} variant="secondary" className="gap-2">
                        <Save className="h-4 w-4" />
                        Save Notifications
                    </Button>
                </CardContent>
            </Card>

            {/* Store Info */}
            <Card>
                <CardHeader>
                    <CardTitle>Store Information</CardTitle>
                    <CardDescription>Display-only store details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                        <div>
                            <Label className="text-muted-foreground">Store Name</Label>
                            <p className="text-base font-medium">TechStore</p>
                        </div>
                        <div>
                            <Label className="text-muted-foreground">Support Email</Label>
                            <p className="text-base font-medium">support@techstore.com</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
