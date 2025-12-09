"use client";

import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
// Removed unused imports

const CATEGORIES = ["Laptops", "Smartphones", "Accessories", "Audio", "Tablets", "Wearables"];
// const BRANDS = ["Apple", "Samsung", "Sony", "Dell", "Logitech"]; // Backend doesn't support brand filter explicitly yet in generic query, but we can add if needed. 
// Checking productQueries.ts -> supports page, limit, category, minPrice, maxPrice, search, sort. 
// No Brand. I will comment out Brand for now to be "production ready" with what works.

export function FilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // State to manage local UI before applying (optional, for immediate feedback usually we sync URL directly)
    // We will sync directly for simplicity.

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === "all") {
            params.delete("category");
        } else {
            params.set("category", category);
        }
        params.set("page", "1"); // Reset page on filter change
        router.push(`/products?${params.toString()}`);
    };

    const handlePriceChange = (value: number[]) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("maxPrice", value[0].toString());
        params.set("page", "1");
        router.push(`/products?${params.toString()}`);
    };

    const handleReset = () => {
        router.push("/products");
    };

    const currentCategory = searchParams.get("category");
    const currentMaxPrice = searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : 2000;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-foreground" onClick={handleReset}>
                    Reset
                </Button>
            </div>

            <Accordion type="single" collapsible defaultValue="category" className="w-full">
                {/* Category Filter */}
                <AccordionItem value="category">
                    <AccordionTrigger>Categories</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-2">
                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="cat-all"
                                    checked={!currentCategory}
                                    onCheckedChange={() => handleCategoryChange("all")}
                                />
                                <Label htmlFor="cat-all" className="text-sm font-normal cursor-pointer">
                                    All Categories
                                </Label>
                            </div>
                            {CATEGORIES.map((category) => (
                                <div key={category} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={`cat-${category}`}
                                        checked={currentCategory === category}
                                        onCheckedChange={() => handleCategoryChange(category)}
                                    />
                                    <Label htmlFor={`cat-${category}`} className="text-sm font-normal cursor-pointer">
                                        {category}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Price Filter */}
                <AccordionItem value="price">
                    <AccordionTrigger>Max Price</AccordionTrigger>
                    <AccordionContent>
                        <div className="pt-4 pb-2 px-2">
                            <Slider
                                defaultValue={[currentMaxPrice]}
                                max={3000}
                                step={50}
                                className="w-full"
                                onValueCommit={handlePriceChange}
                            />
                            <div className="flex justify-between mt-4 text-sm text-muted-foreground">
                                <span>$0</span>
                                <span>${currentMaxPrice}+</span>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
