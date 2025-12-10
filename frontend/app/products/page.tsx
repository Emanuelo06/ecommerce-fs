"use client";

import { ProductCard } from "@/components/product-card";
import { FilterSidebar } from "@/components/filter-sidebar";
import { useProductsQuery } from "@/services/productQueries";
import { Loader2 } from "lucide-react";
import { useSearchParams } from "next/navigation";
import { ProductQueryParams } from "@/services/productQueries";
import { Suspense } from "react";

function ProductsContent() {
    const searchParams = useSearchParams();

    // Parse params
    const category = searchParams.get("category") || undefined;
    const maxPrice = searchParams.get("maxPrice") ? parseInt(searchParams.get("maxPrice")!) : undefined;
    const search = searchParams.get("search") || undefined;
    const page = searchParams.get("page") ? parseInt(searchParams.get("page")!) : 1;

    const queryParams: ProductQueryParams = {
        limit: 12,
        page,
        category,
        maxPrice,
        search
    };

    const { data, isLoading, error } = useProductsQuery(queryParams);

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row gap-8">
                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    <FilterSidebar />
                </aside>

                {/* Product Grid */}
                <main className="flex-1">
                    <div className="mb-6">
                        <h1 className="text-3xl font-bold tracking-tight mb-2">
                            {category ? `${category} Products` : "All Products"}
                        </h1>
                        <p className="text-muted-foreground">
                            {data?.total ? `${data.total} products found` : "Browse our collection"}
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center items-center h-64">
                            <Loader2 className="h-8 w-8 animate-spin text-primary" />
                        </div>
                    ) : error ? (
                        <div className="text-center text-red-500 py-12">
                            Failed to load products: {error.message}
                        </div>
                    ) : !data || data.products.length === 0 ? (
                        <div className="text-center text-muted-foreground py-12 bg-muted/20 rounded-lg">
                            No products found matching your criteria.
                        </div>
                    ) : (
                        <>
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {data.products.map((product) => (
                                    <ProductCard
                                        key={product._id}
                                        id={product._id}
                                        title={product.title}
                                        price={product.price}
                                        category={product.category}
                                        image={product.images?.[0] || `https://placehold.co/600x400?text=${product.title}`}
                                    />
                                ))}
                            </div>

                            {/* Pagination Controls could be added here */}
                            {/* Simple Prev/Next for now if needed, but lets keep it clean first */}
                        </>
                    )}
                </main>
            </div>
        </div>
    );
}

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div className="flex justify-center items-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        }>
            <ProductsContent />
        </Suspense>
    );
}
