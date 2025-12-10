"use client";

import { useState } from "react";
import { useProductsQuery, useDeleteProductMutation } from "@/services/productQueries";
import { useAuth } from "@/context/auth-context";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2, Trash2, Edit, Plus, ImageIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import Image from "next/image";

export default function AdminProductsPage() {
    const { token } = useAuth();
    const { data, isLoading, error } = useProductsQuery({ limit: 100 });
    const { mutate: deleteProduct, isPending: isDeleting } = useDeleteProductMutation();

    const [productToDelete, setProductToDelete] = useState<string | null>(null);

    const handleDelete = () => {
        if (!productToDelete || !token) return;

        deleteProduct(
            { productId: productToDelete, token },
            {
                onSuccess: () => {
                    toast.success("Product deleted successfully");
                    setProductToDelete(null);
                },
                onError: (error: any) => {
                    toast.error("Failed to delete product", {
                        description: error?.response?.data?.message || error.message,
                    });
                },
            }
        );
    };

    if (isLoading) {
        return (
            <div className="flex justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
        );
    }

    if (error) {
        return <div className="p-8 text-red-500">Error loading products: {error.message}</div>;
    }

    return (
        <>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">Products</h2>
                        <p className="text-muted-foreground">Manage your product inventory</p>
                    </div>
                    <Link href="/admin/products/add">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Add Product
                        </Button>
                    </Link>
                </div>

                <div className="border rounded-md">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Image</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Stock</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.products?.map((product) => (
                                <TableRow key={product._id}>
                                    <TableCell>
                                        <div className="relative h-12 w-12 rounded overflow-hidden bg-muted">
                                            {product.images?.[0] ? (
                                                <Image
                                                    src={product.images[0]}
                                                    alt={product.title}
                                                    fill
                                                    className="object-cover"
                                                />
                                            ) : (
                                                <div className="flex items-center justify-center h-full text-muted-foreground">
                                                    <ImageIcon className="h-6 w-6" />
                                                </div>
                                            )}
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{product.title}</TableCell>
                                    <TableCell>{product.category}</TableCell>
                                    <TableCell>${product.price.toFixed(2)}</TableCell>
                                    <TableCell>
                                        <span className={product.stock > 0 ? "" : "text-destructive"}>
                                            {product.stock}
                                        </span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Link href={`/admin/products/edit/${product._id}`}>
                                            <Button variant="ghost" size="icon" className="mr-2">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                        </Link>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => setProductToDelete(product._id)}
                                            disabled={isDeleting}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {(!data?.products || data.products.length === 0) && (
                                <TableRow>
                                    <TableCell colSpan={6} className="text-center h-24">
                                        No products found. Add your first product!
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>

            {/* Delete Confirmation Dialog */}
            <AlertDialog open={!!productToDelete} onOpenChange={() => setProductToDelete(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the product.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} className="bg-destructive hover:bg-destructive/90">
                            {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Delete
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
