"use client";

import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";

const CATEGORIES = ["Laptops", "Smartphones", "Accessories", "Audio", "Tablets", "Wearables"];

export function FilterSidebar() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [searchQuery, setSearchQuery] = useState(searchParams.get("search") || "");

    const handleCategoryChange = (category: string) => {
        const params = new URLSearchParams(searchParams.toString());
        if (category === "all") {
            params.delete("category");
        } else {
            params.set("category", category);
        }
        params.set("page", "1");
        router.push(`/products?${params.toString()}`);
    };

    const handleSearch = () => {
        const params = new URLSearchParams(searchParams.toString());
        if (searchQuery.trim()) {
            params.set("search", searchQuery.trim());
        } else {
            params.delete("search");
        }
        params.set("page", "1");
        router.push(`/products?${params.toString()}`);
    };

    const handlePriceChange = (value: number[], isMin: boolean = false) => {
        const params = new URLSearchParams(searchParams.toString());
        if (isMin) {
            params.set("minPrice", value[0].toString());
        } else {
            params.set("maxPrice", value[0].toString());
        }
        params.set("page", "1");
        router.push(`/products?${params.toString()}`);
    };

    const handleReset = () => {
        setSearchQuery("");
        router.push("/products");
    };

    const currentCategory = searchParams.get("category");
    const currentMinPrice = searchParams.get("minPrice") ? parseInt(searchParams.get("minPrice")!) : 0;
    const currentMaxPrice = searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : 2000;

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">Filters</h3>
                <Button variant="ghost" size="sm" className="h-auto p-0 text-muted-foreground hover:text-foreground" onClick={handleReset}>
                    Reset
                </Button>
            </div>

            {/* Search Bar */}
            <div className="space-y-2">
                <Label htmlFor="search" className="text-sm font-medium">Search Products</Label>
                <div className="flex gap-2">
                    <Input
                        id="search"
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                handleSearch();
                            }
                        }}
                        className="flex-1"
                    />
                    <Button size="icon" onClick={handleSearch}>
                        <Search className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <Accordion type="multiple" defaultValue={["category", "price"]} className="w-full">
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
                    <AccordionTrigger>Price Range</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-6">
                            {/* Min Price */}
                            <div className="pt-4 pb-2 px-2">
                                <Label className="text-sm mb-2 block">Minimum Price</Label>
                                <Slider
                                    defaultValue={[currentMinPrice]}
                                    max={2000}
                                    step={50}
                                    className="w-full"
                                    onValueCommit={(value) => handlePriceChange(value, true)}
                                />
                                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                                    <span>$0</span>
                                    <span>${currentMinPrice}</span>
                                </div>
                            </div>

                            {/* Max Price */}
                            <div className="pb-2 px-2">
                                <Label className="text-sm mb-2 block">Maximum Price</Label>
                                <Slider
                                    defaultValue={[currentMaxPrice]}
                                    max={3000}
                                    step={50}
                                    className="w-full"
                                    onValueCommit={(value) => handlePriceChange(value, false)}
                                />
                                <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                                    <span>$0</span>
                                    <span>${currentMaxPrice}+</span>
                                </div>
                            </div>
                        </div>
                    </AccordionContent>
                </AccordionItem>

                {/* Attributes Filter */}
                <AccordionItem value="attributes">
                    <AccordionTrigger>Attributes</AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4 pt-2">
                            <div className="space-y-2">
                                <Label className="text-sm">Color</Label>
                                <Input
                                    placeholder="e.g. Red, Blue"
                                    className="h-8"
                                    defaultValue={searchParams.get("attributes[Color]") || ""}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            const val = e.currentTarget.value;
                                            const params = new URLSearchParams(searchParams.toString());
                                            if (val) params.set("attributes[Color]", val);
                                            else params.delete("attributes[Color]");
                                            params.set("page", "1");
                                            router.push(`/products?${params.toString()}`);
                                        }
                                    }}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-sm">Size</Label>
                                <Input
                                    placeholder="e.g. S, M, L"
                                    className="h-8"
                                    defaultValue={searchParams.get("attributes[Size]") || ""}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            const val = e.currentTarget.value;
                                            const params = new URLSearchParams(searchParams.toString());
                                            if (val) params.set("attributes[Size]", val);
                                            else params.delete("attributes[Size]");
                                            params.set("page", "1");
                                            router.push(`/products?${params.toString()}`);
                                        }
                                    }}
                                />
                            </div>
                            <p className="text-xs text-muted-foreground mt-2">Press Enter to apply filters</p>
                        </div>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}
