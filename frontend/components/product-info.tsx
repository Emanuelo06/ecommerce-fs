"use client";

"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ShoppingCart, Heart, Share2 } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Product from "@/types/Product";

interface ProductInfoProps {
    product: Product;
}

export function ProductInfo({ product }: ProductInfoProps) {
    const [selectedSize, setSelectedSize] = useState("M");
    const [selectedColor, setSelectedColor] = useState("Black");

    return (
        <div className="space-y-6">
            {/* Title & Reviews - Rendered in parent, but can be kept here if we want isolation. 
          For now, matching parent's new layout, we might remove duplication or just keep actions here.
          Let's assume parent handles Title/Price and this handles Actions/Variants to be cleaner?
          Actually the parent I wrote duplicates Title/Price. I should probably clean that up.
          For this step, I will make this component receive product and render the ACTIONS and VARIANTS primarily,
          or render everything if the design calls for it. 
          Looking at the PDP code, I rendered Title/Price in the parent. 
          So I should probably remove Title/Price from here or fully utilize this component.
          Let's make this component responsible for the whole Right Side info column to avoid duplication.
      */}

            <div>
                <h1 className="text-3xl font-bold">{product.title}</h1>
                <div className="flex items-center gap-2 mt-2">
                    <div className="flex text-yellow-500">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span key={star}>★</span>
                        ))}
                    </div>
                    <span className="text-sm text-muted-foreground">(128 reviews)</span>
                    <Badge variant="secondary" className="ml-2">{product.stock > 0 ? "In Stock" : "Out of Stock"}</Badge>
                </div>
            </div>

            <div className="text-4xl font-bold">${product.price.toFixed(2)}</div>

            <p className="text-muted-foreground">
                {product.description}
            </p>

            <Separator />

            {/* Color Selection */}
            <div className="space-y-3">
                <span className="font-semibold">Color: {selectedColor}</span>
                <div className="flex gap-2">
                    {["Black", "Silver", "Blue"].map((color) => (
                        <button
                            key={color}
                            className={cn(
                                "w-8 h-8 rounded-full border-2 focus:outline-none focus:ring-2 focus:ring-offset-2",
                                selectedColor === color ? "ring-2 ring-primary border-transparent" : "border-muted"
                            )}
                            style={{ backgroundColor: color.toLowerCase() }}
                            onClick={() => setSelectedColor(color)}
                            title={color}
                        />
                    ))}
                </div>
            </div>

            {/* Size Selection */}
            <div className="space-y-3">
                <span className="font-semibold">Size: {selectedSize}</span>
                <div className="flex gap-2">
                    {["S", "M", "L", "XL"].map((size) => (
                        <button
                            key={size}
                            className={cn(
                                "w-10 h-10 rounded-md border flex items-center justify-center text-sm font-medium transition-colors",
                                selectedSize === size
                                    ? "bg-primary text-primary-foreground border-primary"
                                    : "bg-background hover:bg-muted text-foreground"
                            )}
                            onClick={() => setSelectedSize(size)}
                        >
                            {size}
                        </button>
                    ))}
                </div>
            </div>

            <div className="flex gap-4 pt-4">
                <Button size="lg" className="flex-1">
                    <ShoppingCart className="mr-2 h-5 w-5" /> Add to Cart
                </Button>
                <Button size="icon" variant="outline">
                    <Heart className="h-5 w-5" />
                </Button>
                <Button size="icon" variant="outline">
                    <Share2 className="h-5 w-5" />
                </Button>
            </div>
        </div>
    );
}
