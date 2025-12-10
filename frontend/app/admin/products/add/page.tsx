"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, X, Loader2, Image as ImageIcon, Plus, Trash2 } from "lucide-react";
import { useCreateProductMutation } from "@/services/productQueries";
import { useAuth } from "@/context/auth-context";
import { toast } from "sonner";
import Image from "next/image";

const CATEGORIES = ["Laptops", "Smartphones", "Accessories", "Audio", "Tablets", "Wearables"];

export default function AddProductPage() {
    const router = useRouter();
    const { token } = useAuth();
    const { mutate: createProduct, isPending } = useCreateProductMutation();

    // Form state
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [stock, setStock] = useState("");
    const [category, setCategory] = useState("");
    const [brand, setBrand] = useState("");
    const [images, setImages] = useState<string[]>([]);

    const [attributes, setAttributes] = useState<{ name: string; values: string[] }[]>([]);
    const [variants, setVariants] = useState<{ name: string; price: number; stock: number; attributes: Record<string, string>; sku: string }[]>([]);

    // Attribute handlers
    const addAttribute = () => {
        setAttributes([...attributes, { name: "", values: [] }]);
    };

    const removeAttribute = (index: number) => {
        setAttributes(attributes.filter((_, i) => i !== index));
    };

    const updateAttribute = (index: number, field: "name" | "values", value: string) => {
        const newAttributes = [...attributes];
        if (field === "name") {
            newAttributes[index].name = value;
        } else {
            // Split by comma and clean up
            newAttributes[index].values = value.split(",").map(v => v.trim()); // Store as array for logic, visual input is comma string in UI
        }
        setAttributes(newAttributes);
    };

    // Variant Generation Logic
    const generateVariants = () => {
        if (attributes.length === 0) return;

        // Helper to generate combinations
        const cartesian = (args: string[][]) => {
            const r: string[][] = [];
            const max = args.length - 1;
            function helper(arr: string[], i: number) {
                for (let j = 0, l = args[i].length; j < l; j++) {
                    const a = arr.slice(0); // clone arr
                    a.push(args[i][j]);
                    if (i == max) r.push(a);
                    else helper(a, i + 1);
                }
            }
            helper([], 0);
            return r;
        };

        const validAttributes = attributes.filter(a => a.name && a.values.length > 0 && a.values[0] !== "");
        if (validAttributes.length === 0) {
            toast.error("Please add valid attributes with values");
            return;
        }

        const attributeValues = validAttributes.map(a => a.values);
        const combinations = cartesian(attributeValues);

        const basePrice = parseFloat(price) || 0;
        const baseStock = parseInt(stock) || 0;

        const newVariants = combinations.map(combo => {
            const variantAttributes: Record<string, string> = {};
            const nameParts: string[] = [];

            combo.forEach((value, index) => {
                const attrName = validAttributes[index].name;
                variantAttributes[attrName] = value;
                nameParts.push(value);
            });

            return {
                name: nameParts.join(" / "),
                price: basePrice,
                stock: baseStock,
                attributes: variantAttributes,
                sku: "" // user can fill
            };
        });

        setVariants(newVariants);
        toast.success(`Generated ${newVariants.length} variants`);
    };

    const updateVariant = (index: number, field: string, value: string) => {
        const newVariants = [...variants];
        if (field === "price") newVariants[index].price = parseFloat(value) || 0;
        if (field === "stock") newVariants[index].stock = parseInt(value) || 0;
        if (field === "sku") newVariants[index].sku = value;
        setVariants(newVariants);
    };

    const removeVariant = (index: number) => {
        setVariants(variants.filter((_, i) => i !== index));
    };

    // Drag and drop handler
    const onDrop = useCallback((acceptedFiles: File[]) => {
        // Limit to 5 images total
        if (images.length + acceptedFiles.length > 5) {
            toast.error("Maximum 5 images allowed");
            return;
        }

        acceptedFiles.forEach((file) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result as string;
                setImages((prev) => [...prev, base64]);
            };
            reader.readAsDataURL(file);
        });
    }, [images.length]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg', '.webp']
        },
        maxSize: 5242880, // 5MB
    });

    const removeImage = (index: number) => {
        setImages((prev) => prev.filter((_, i) => i !== index));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !price || !stock || !category) {
            toast.error("Please fill in all required fields");
            return;
        }

        if (images.length === 0) {
            toast.error("Please add at least one image");
            return;
        }

        if (!token) {
            toast.error("Authentication required");
            return;
        }

        const productData = {
            title,
            description,
            price: parseFloat(price),
            stock: parseInt(stock),
            category,
            brand,
            images,
            attributes: attributes.filter(a => a.name && a.values.length > 0),
            variants,
        };

        createProduct(
            { data: productData as any, token },
            {
                onSuccess: () => {
                    toast.success("Product created successfully!");
                    router.push("/admin/products");
                },
                onError: (error: any) => {
                    toast.error("Failed to create product", {
                        description: error?.response?.data?.message || error.message,
                    });
                },
            }
        );
    };

    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
                <p className="text-muted-foreground">Create a new product listing</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Product Images */}
                <Card>
                    <CardHeader>
                        <CardTitle>Product Images</CardTitle>
                        <CardDescription>Upload up to 5 images (max 5MB each)</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        {/* Dropzone */}
                        <div
                            {...getRootProps()}
                            className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${isDragActive
                                ? "border-primary bg-primary/5"
                                : "border-muted-foreground/25 hover:border-primary/50"
                                }`}
                        >
                            <input {...getInputProps()} />
                            <div className="flex flex-col items-center gap-2">
                                <div className="p-4 rounded-full bg-primary/10">
                                    <Upload className="h-8 w-8 text-primary" />
                                </div>
                                {isDragActive ? (
                                    <p className="text-lg font-medium">Drop images here...</p>
                                ) : (
                                    <>
                                        <p className="text-lg font-medium">Drag & drop images here</p>
                                        <p className="text-sm text-muted-foreground">or click to browse</p>
                                    </>
                                )}
                                <p className="text-xs text-muted-foreground mt-2">
                                    PNG, JPG, JPEG, WEBP (max 5MB)
                                </p>
                            </div>
                        </div>

                        {/* Image Previews */}
                        {images.length > 0 && (
                            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                                {images.map((image, index) => (
                                    <div key={index} className="relative group">
                                        <div className="relative aspect-square rounded-lg overflow-hidden border">
                                            <Image
                                                src={image}
                                                alt={`Product ${index + 1}`}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            size="icon"
                                            className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={() => removeImage(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </Button>
                                        {index === 0 && (
                                            <span className="absolute bottom-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                                                Main
                                            </span>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Product Details */}
                <Card>
                    <CardHeader>
                        <CardTitle>Product Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <Label htmlFor="title">
                                    Title <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="title"
                                    placeholder="Product name"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="brand">Brand</Label>
                                <Input
                                    id="brand"
                                    placeholder="e.g., Apple, Samsung"
                                    value={brand}
                                    onChange={(e) => setBrand(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">
                                Description <span className="text-destructive">*</span>
                            </Label>
                            <Textarea
                                id="description"
                                placeholder="Detailed product description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                rows={4}
                                required
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <div className="space-y-2">
                                <Label htmlFor="price">
                                    Price ($) <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    placeholder="0.00"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="stock">
                                    Stock <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="stock"
                                    type="number"
                                    min="0"
                                    placeholder="0"
                                    value={stock}
                                    onChange={(e) => setStock(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="category">
                                    Category <span className="text-destructive">*</span>
                                </Label>
                                <Select value={category} onValueChange={setCategory} required>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {CATEGORIES.map((cat) => (
                                            <SelectItem key={cat} value={cat}>
                                                {cat}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Product Attributes & Variants */}
                <Card>
                    <CardHeader>
                        <CardTitle>Product Variants</CardTitle>
                        <CardDescription>Add attributes like color or size to create variants</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Attributes Input */}
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                <Label className="text-base font-semibold">Attributes</Label>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    onClick={addAttribute}
                                    className="gap-2"
                                >
                                    <Plus className="h-4 w-4" />
                                    Add Attribute
                                </Button>
                            </div>

                            {attributes.length === 0 && (
                                <p className="text-sm text-muted-foreground italic">No attributes added yet.</p>
                            )}

                            {attributes.map((attr, index) => (
                                <div key={index} className="grid md:grid-cols-[1fr,2fr,auto] gap-4 items-start border p-4 rounded-lg">
                                    <div className="space-y-2">
                                        <Label>Name</Label>
                                        <Input
                                            placeholder="e.g. Color"
                                            value={attr.name}
                                            onChange={(e) => updateAttribute(index, "name", e.target.value)}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Values (comma separated)</Label>
                                        <Input
                                            placeholder="e.g. Red, Blue, Green"
                                            value={attr.values.join(", ")}
                                            onChange={(e) => updateAttribute(index, "values", e.target.value)}
                                        />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeAttribute(index)}
                                        className="mt-8 text-destructive"
                                    >
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>

                        {attributes.length > 0 && (
                            <Button type="button" onClick={generateVariants} variant="secondary" className="w-full">
                                Generate Variants from Attributes
                            </Button>
                        )}

                        {/* Variants Table */}
                        {variants.length > 0 && (
                            <div className="space-y-4 pt-4 border-t">
                                <div className="flex items-center justify-between">
                                    <Label className="text-base font-semibold">Variants ({variants.length})</Label>
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => setVariants([])}
                                        className="text-destructive h-auto p-0"
                                    >
                                        Clear All
                                    </Button>
                                </div>
                                <div className="relative overflow-x-auto border rounded-lg">
                                    <table className="w-full text-sm text-left">
                                        <thead className="text-xs text-muted-foreground uppercase bg-muted/50 border-b">
                                            <tr>
                                                <th className="px-4 py-3">Variant</th>
                                                <th className="px-4 py-3">Price ($)</th>
                                                <th className="px-4 py-3">Stock</th>
                                                <th className="px-4 py-3">SKU</th>
                                                <th className="px-4 py-3 w-[50px]"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {variants.map((variant, index) => (
                                                <tr key={index} className="border-b last:border-0 hover:bg-muted/5">
                                                    <td className="px-4 py-3 font-medium">{variant.name}</td>
                                                    <td className="px-4 py-3">
                                                        <Input
                                                            type="number"
                                                            className="h-8 w-24"
                                                            value={variant.price}
                                                            onChange={(e) => updateVariant(index, "price", e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Input
                                                            type="number"
                                                            className="h-8 w-24"
                                                            value={variant.stock}
                                                            onChange={(e) => updateVariant(index, "stock", e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Input
                                                            className="h-8 w-32"
                                                            value={variant.sku}
                                                            onChange={(e) => updateVariant(index, "sku", e.target.value)}
                                                        />
                                                    </td>
                                                    <td className="px-4 py-3">
                                                        <Button
                                                            type="button"
                                                            variant="ghost"
                                                            size="icon"
                                                            className="h-8 w-8 text-destructive"
                                                            onClick={() => removeVariant(index)}
                                                        >
                                                            <X className="h-4 w-4" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex gap-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => router.back()}
                        disabled={isPending}
                    >
                        Cancel
                    </Button>
                    <Button type="submit" disabled={isPending} className="gap-2">
                        {isPending && <Loader2 className="h-4 w-4 animate-spin" />}
                        Create Product
                    </Button>
                </div>
            </form>
        </div>
    );
}
