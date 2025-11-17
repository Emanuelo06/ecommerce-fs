import {z} from 'zod';

const orderProductSchema = z.object({
    productId: z.string().length(24,"invalid MongoDSB ObjectId"),
    quantity: z.number().int().min(1, "Quntity must be at least 1"),
});

const shippingInfoSchema = z.object({
  username: z.string().min(2, "Username is required"),
  email: z.email("Invalid email address"),
  phoneNumber: z.string().min(7, "Phone number is required"),
  address: z.string().min(5, "Address is required"),
});


export const createOrderSchema = z.object({
  products: z.array(orderProductSchema).min(1, "At least one product is required"),
  userId: z.string().length(24, "Invalid user ID"),
  shippingInfo: shippingInfoSchema,
  totalAmount: z.number().positive("Total amount must be positive"),
  status: z.enum(['pending', 'shipped', 'delivered', 'cancelled']).optional().default("pending"),
});

export const updateOrderSchema = z.object({
  products: z.array(orderProductSchema).min(1, "At least one product is required").optional(),
  userId: z.string().length(24, "Invalid user ID").optional(),
  shippingInfo: shippingInfoSchema.optional(),
  totalAmount: z.number().positive("Total amount must be positive").optional(),
  status: z.enum(['pending', 'shipped', 'delivered', 'cancelled']).optional().default("pending"),
});
