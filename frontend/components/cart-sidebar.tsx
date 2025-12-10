"use client";

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
    SheetFooter,
    SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingCart, Trash2, Loader2, Minus, Plus } from "lucide-react";
import Image from "next/image";
import { useCart } from "@/context/cart-context";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export function CartSidebar() {
    const { cart, isLoading, removeFromCart, updateQuantity, itemsCount } = useCart();

    const total = cart?.totalPrice || 0;

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                    <ShoppingCart className="h-5 w-5" />
                    {itemsCount > 0 && (
                        <Badge variant="destructive" className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-[10px]">
                            {itemsCount}
                        </Badge>
                    )}
                    <span className="sr-only">Open cart</span>
                </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:w-[540px] flex flex-col">
                <SheetHeader>
                    <SheetTitle>My Cart ({itemsCount})</SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto py-6">
                    {isLoading ? (
                        <div className="flex justify-center items-center h-full">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : !cart || cart.items.length === 0 ? (
                        <div className="text-center text-muted-foreground py-12">
                            Your cart is empty.
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {cart.items.map((item) => (
                                <div key={item._id || `${item.product._id}-${JSON.stringify(item.variant || {})}`} className="flex gap-4">
                                    <div className="relative h-20 w-20 rounded-md overflow-hidden border">
                                        <Image
                                            src={item.product.images?.[0] || "https://placehold.co/100"}
                                            alt={item.product.title}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h4 className="font-medium line-clamp-2 leading-tight">{item.product.title}</h4>
                                                {item.variant && (
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        {item.variant.name ||
                                                            (item.variant.attributes && Object.entries(item.variant.attributes).map(([k, v]) => `${k}: ${v}`).join(", "))
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <p className="font-bold ml-2">${((item.variant?.price || item.product.price) * item.quantity).toFixed(2)}</p>
                                        </div>
                                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                                            <div className="flex items-center gap-2">
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                                                >
                                                    <Minus className="h-3 w-3" />
                                                </Button>
                                                <span>{item.quantity}</span>
                                                <Button
                                                    variant="outline"
                                                    size="icon"
                                                    className="h-6 w-6"
                                                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                                                >
                                                    <Plus className="h-3 w-3" />
                                                </Button>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-destructive hover:bg-destructive/10"
                                                onClick={() => removeFromCart(item.product._id)}
                                            >
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                <div className="border-t pt-6 mt-6">
                    <div className="flex justify-between text-lg font-semibold mb-6">
                        <span>Total</span>
                        <span>${total.toFixed(2)}</span>
                    </div>
                    <SheetFooter>
                        <SheetClose asChild>
                            <Link href="/checkout" className="w-full">
                                <Button className="w-full" size="lg" disabled={!cart || cart.items.length === 0}>
                                    Checkout
                                </Button>
                            </Link>
                        </SheetClose>
                    </SheetFooter>
                </div>

            </SheetContent>
        </Sheet>
    );
}
