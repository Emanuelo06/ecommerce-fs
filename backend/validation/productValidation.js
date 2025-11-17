import {z} from "zod";

export const createProductSchema = z.object({
    title : z.string().min(3, "Name must  be at least 3 characters"),
    description: z.string().min(10, "Descriptin must be at least 10 characters"),
    price: z.number().positive("Price must be positive"),
    category: z.string().min(3, "Category must be at least 3 characters"),
    images: z.array(z.url("Each image must be a valid URL"))
         .min(1, "At least one image is required"),
    stock: z.number().int().nonnegative("Stock must be a non-negative integer")
})

export const updateProductSchema = z.object({
    title : z.string().min(3, "Name must  be at least 3 characters").optional(),
    description: z.string().min(10, "Descriptin must be at least 10 characters").optional(),
    price: z.number().positive("Price must be positive").optional(),
    category: z.string().min(3, "Category must be at least 3 characters").optional(),
    images: z.array(z.url("Each image must be a valid URL"))
         .min(1, "At least one image is required").optional(),
    stock: z.number().int().nonnegative("Stock must be a non-negative integer").optional()
})