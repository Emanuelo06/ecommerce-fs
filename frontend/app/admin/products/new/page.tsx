"use client";

import { ProductForm } from "@/components/product-form";
import { useCreateProductMutation } from "@/services/productQueries";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { toast } from "sonner"; // Using sonner as installed

export default function NewProductPage() {
    const { token } = useAuth();
    const router = useRouter();
    const { mutate: createProduct, isPending } = useCreateProductMutation();

    const handleSubmit = (values: any) => {
        if (!token) return;

        // Transform values if needed (e.g. image string to array)
        const productData = {
            ...values,
            images: values.image ? [values.image] : [],
        };
        // remove single image field if not in type (it's not)
        delete productData.image;

        createProduct(
            {
                data: productData,
                token,
            },
            {
                onSuccess: () => {
                    toast.success("Product created successfully");
                    router.push("/admin/products");
                },
                onError: (error) => {
                    toast.error(`Failed to create product: ${error.message}`);
                },
            }
        );
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Create Product</h2>
            </div>
            <div className="border p-6 rounded-lg bg-card text-card-foreground shadow-sm">
                <ProductForm onSubmit={handleSubmit} isLoading={isPending} />
            </div>
        </div>
    );
}
