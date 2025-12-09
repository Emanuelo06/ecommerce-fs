"use client";

import React from "react";
import Image from "next/image";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/context/cart-context";
// Removed unused toast import

interface ProductCardProps {
    id: string; // Made id required for linking/cart
    title?: string;
    price?: number;
    image?: string;
    category?: string;
    isNew?: boolean;
}

export function ProductCard({
    id,
    title = "Product Title",
    price = 0,
    image = "https://placehold.co/600x400",
    category = "Category",
    isNew = false,
}: ProductCardProps) {
    const { addToCart } = useCart();

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault(); // Prevent navigation to product page
        e.stopPropagation();
        addToCart(id, 1);
    };

    return (
        <Link href={`/products/${id}`} className="block h-full">
            <Card className="overflow-hidden group h-full flex flex-col transition-all hover:shadow-lg border-muted">
                <div className="relative aspect-square overflow-hidden bg-muted">
                    <Image
                        src={image}
                        alt={title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                    {isNew && (
                        <Badge className="absolute top-2 right-2 bg-primary text-primary-foreground hover:bg-primary/90">
                            New
                        </Badge>
                    )}
                </div>
                <CardContent className="p-4 flex-1">
                    <div className="text-xs text-muted-foreground mb-1 uppercase tracking-wider">{category}</div>
                    <h3 className="font-semibold text-lg leading-tight mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {title}
                    </h3>
                    <div className="font-bold text-xl text-foreground">${price.toFixed(2)}</div>
                </CardContent>
                <CardFooter className="p-4 pt-0 mt-auto">
                    <Button
                        className="w-full"
                        onClick={handleAddToCart}
                        variant="secondary"
                    >
                        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}
