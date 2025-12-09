"use client";

import { useProductQuery } from "@/services/productQueries";
import { ProductImageGallery } from "@/components/product-image-gallery";
import { ProductInfo } from "@/components/product-info";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Loader2 } from "lucide-react";
import { use } from "react";

export default function ProductDetailPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    // Unwrap params using React.use()
    const { slug } = use(params);

    const { data: product, isLoading, error } = useProductQuery(slug);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[50vh]">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="container px-4 py-8 mx-auto text-center text-red-500">
                Error loading product. Please try again later.
            </div>
        )
    }

    return (
        <div className="container px-4 py-8 mx-auto">
            {/* Breadcrumbs */}
            <div className="text-sm breadcrumbs text-muted-foreground mb-6">
                <span>Home</span> / <span>{product.category}</span> / <span className="text-foreground">{product.title}</span>
            </div>

            <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                {/* Left: Image Gallery */}
                <ProductImageGallery images={product.images && product.images.length > 0 ? product.images : ["https://placehold.co/600x600?text=No+Image"]} />

                {/* Right: Product Info */}
                <ProductInfo product={product} />
            </div>

            <Separator className="my-12" />

            {/* Tabs Section for Reviews/Details */}
            <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full md:w-[400px] grid-cols-2">
                    <TabsTrigger value="details">Details & Specs</TabsTrigger>
                    <TabsTrigger value="reviews">Reviews</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-6 space-y-4">
                    <h3 className="text-xl font-semibold">Product Specifications</h3>
                    <p className="text-muted-foreground">
                        {product.description}
                    </p>
                </TabsContent>
                <TabsContent value="reviews" className="mt-6">
                    <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                    <p className="text-muted-foreground">No reviews yet.</p>
                </TabsContent>
            </Tabs>
        </div>
    );
}
