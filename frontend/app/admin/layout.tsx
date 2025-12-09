"use client";

import { AdminSidebar } from "@/components/admin-sidebar";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2 } from "lucide-react";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { user, isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // Simple client-side protection
        // In a real app, Middleware is better, but this works for client-side rendering
        if (!isAuthenticated) {
            // Wait a bit to ensure context is loaded
            // Actually isAuthenticated is derived from token presence
            router.push("/login");
        } else if (user && user.role !== "admin") {
            router.push("/"); // Redirect non-admins to home
        }
    }, [isAuthenticated, user, router]);

    if (!isAuthenticated || (user && user.role !== "admin")) {
        return (
            <div className="flex h-screen items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    return (
        <div className="flex h-screen overflow-hidden">
            <AdminSidebar />
            <main className="flex-1 overflow-y-auto bg-background p-8">
                {children}
            </main>
        </div>
    );
}
