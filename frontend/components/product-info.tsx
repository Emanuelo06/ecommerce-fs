"use client";

"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Product from "@/types/Product";
import { useCart } from "@/context/cart-context";

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    // Initialize with first values of each attribute if available
    const [selectedAttributes, setSelectedAttributes] = useState<Record<string, string>>(() => {
        const initial: Record<string, string> = {};
        product.attributes?.forEach(attr => {
            if (attr.values.length > 0) {
                initial[attr.name] = attr.values[0];
            }
        });
        return initial;
    });

    const [quantity, setQuantity] = useState(1);

    // Find selected variant
    const selectedVariant = product.variants?.find(v =>
        product.attributes?.every(attr =>
            v.attributes?.[attr.name] === selectedAttributes[attr.name]
        )
    );

    const currentPrice = selectedVariant ? selectedVariant.price : product.price;
    const currentStock = selectedVariant ? selectedVariant.stock : product.stock;
    const isOutOfStock = currentStock <= 0;

    const handleAttributeChange = (name: string, value: string) => {
        setSelectedAttributes(prev => ({ ...prev, [name]: value }));
    };

    const { addToCart } = useCart();

    const handleAddToCart = () => {
        addToCart(product._id, quantity, selectedAttributes);
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-yellow-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>★</span>
                        ))}
                    </div>
                    <span className="text-sm text-muted-foreground">(128 reviews)</span>
                    <Badge variant={isOutOfStock ? "destructive" : "secondary"} className="ml-2">
                        {isOutOfStock ? "Out of Stock" : "In Stock"}
                    </Badge>
                </div>
            </div>

            <div className="text-4xl font-bold">${currentPrice.toFixed(2)}</div>

            <p className="text-muted-foreground">
                {product.description}
            </p>

            <Separator />

            {/* Dynamic Attribute Selection */}
            {product.attributes?.map((attr) => (
                <div key={attr.name} className="space-y-3">
                    <span className="font-semibold">{attr.name}: {selectedAttributes[attr.name]}</span>
                    <div className="flex flex-wrap gap-2">
                        {attr.values.map((value) => (
                            <button
                                key={value}
                                className={cn(
                                    "px-4 py-2 rounded-md border text-sm font-medium transition-colors",
                                    selectedAttributes[attr.name] === value
                                        ? "bg-primary text-primary-foreground border-primary"
                                        : "bg-background hover:bg-muted text-foreground"
                                )}
                                onClick={() => handleAttributeChange(attr.name, value)}
                            >
                                {value}
                            </button>
                        ))}
                    </div>
                </div>
            ))}

            <div className="flex gap-4 pt-4">
                <Button size="lg" className="flex-1" disabled={isOutOfStock} onClick={handleAddToCart}>
                    <ShoppingCart className="mr-2 h-5 w-5" />
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
                <Button size="icon" variant="outline">
                    <Heart className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="outline">
                    <Share2 className="h-5 w-5" />
                </Button>
            </div>
            {selectedVariant && (
                <p className="text-xs text-muted-foreground">SKU: {selectedVariant.sku || "N/A"}</p>
            )}
        </div>
    );
}
