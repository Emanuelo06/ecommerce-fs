"use client";

import React from "react";
import Link from "next/link";
import { Menu, User, Zap } from "lucide-react";
import { ModeToggle } from "@/components/mode-toggle";
import { CartSidebar } from "@/components/cart-sidebar";
import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth-context";

const Navbar = () => {
    const { isAuthenticated } = useAuth();
    return (
        <div className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/60">
            <div className="flex h-16 items-center px-4 container mx-auto justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-2 text-xl font-bold tracking-tighter">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Zap className="h-5 w-5" />
                    </div>
                    TechStore
                </Link>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center space-x-4">
                    <NavigationMenu>
                        <NavigationMenuList>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/" className={navigationMenuTriggerStyle()}>
                                        Home
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/products" className={navigationMenuTriggerStyle()}>
                                        Products
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/about" className={navigationMenuTriggerStyle()}>
                                        About
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                            <NavigationMenuItem>
                                <NavigationMenuLink asChild>
                                    <Link href="/contact" className={navigationMenuTriggerStyle()}>
                                        Contact
                                    </Link>
                                </NavigationMenuLink>
                            </NavigationMenuItem>
                        </NavigationMenuList>
                    </NavigationMenu>
                </div>

                {/* Desktop Actions */}
                <div className="hidden md:flex items-center space-x-2">
                    <ModeToggle />
                    <CartSidebar />
                    <Link href={isAuthenticated ? "/profile" : "/login"}>
                        <Button variant="ghost" size="icon" title="My Account">
                            <User className="h-5 w-5" />
                        </Button>
                    </Link>
                </div>

                {/* Mobile Navigation */}
                <div className="md:hidden flex items-center gap-2">
                    <CartSidebar />
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon">
                                <Menu className="h-6 w-6" />
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="right">
                            <SheetHeader>
                                <SheetTitle className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                                        <Zap className="h-5 w-5" />
                                    </div>
                                    TechStore
                                </SheetTitle>
                            </SheetHeader>
                            <div className="flex flex-col space-y-4 mt-8">
                                <Link href="/" className="text-lg font-medium hover:text-primary transition-colors">
                                    Home
                                </Link>
                                <Link href="/products" className="text-lg font-medium hover:text-primary transition-colors">
                                    Products
                                </Link>
                                <Link href="/about" className="text-lg font-medium hover:text-primary transition-colors">
                                    About
                                </Link>
                                <Link href="/contact" className="text-lg font-medium hover:text-primary transition-colors">
                                    Contact
                                </Link>
                                <Link href="/products?category=Smartphones" className="text-lg font-medium hover:text-primary transition-colors">
                                    Phones
                                </Link>
                                <div className="border-t pt-4 mt-4">
                                    <Link href={isAuthenticated ? "/profile" : "/login"} className="flex items-center gap-2 text-lg font-medium hover:text-primary transition-colors">
                                        <User className="h-5 w-5" /> My Account
                                    </Link>
                                </div>
                                <div className="pt-2">
                                    <ModeToggle />
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </div>
    );
};

export default Navbar;