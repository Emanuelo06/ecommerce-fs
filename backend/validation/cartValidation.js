import {z} from "zod";

export const addItemSchema = z.object({
    productId: z.string().length(24, "Invalid product ID"),
    quantity: z.number().min(1, "Quantity must be at least 1"),
});

export const updateItemSchema = z.object({
    quantity: z.number().min(1, "Quantity must be at least 1"),
});

export const productIdParamSchema = z.object({
    productId: z.string().length(24, "Invalid product ID"),
})

export const mergeCartSchema = z.object({
    items: z.array(
        z.object({
            productId: z.string().length(24, "Invalid product ID"),
            quantity: z.number().min(1, "Quantity must be at least 1")
        })
    )
});