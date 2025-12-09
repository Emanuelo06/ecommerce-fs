"use client";

import { ProductForm } from "@/components/product-form";
import { useProductQuery, useUpdateProductMutation } from "@/services/productQueries";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { use } from "react";

export default function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = use(params);
    const { token } = useAuth();
    const router = useRouter();

    const { data: product, isLoading: isLoadingProduct, error: loadError } = useProductQuery(id);
    const { mutate: updateProduct, isPending: isUpdating } = useUpdateProductMutation();

    const handleSubmit = (values: any) => {
        if (!token) return;

        const productData = {
            ...values,
            images: values.image ? [values.image] : [],
        };
        delete productData.image;

        updateProduct(
            {
                productId: id,
                data: productData,
                token,
            },
            {
                onSuccess: () => {
                    toast.success("Product updated successfully");
                    router.push("/admin/products");
                },
                onError: (error) => {
                    toast.error(`Failed to update product: ${error.message}`);
                },
            }
        );
    };

    if (isLoadingProduct) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        )
    }

    if (loadError || !product) {
        return (
            <div className="p-8 text-red-500">
                Error loading product: {loadError?.message || "Product not found"}
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Edit Product</h2>
            </div>
            <div className="border p-6 rounded-lg bg-card text-card-foreground shadow-sm">
                <ProductForm
                    initialData={product}
                    onSubmit={handleSubmit}
                    isLoading={isUpdating}
                />
            </div>
        </div>
    );
}
