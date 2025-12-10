import { z } from 'zod';

export const createUserSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters"),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    phoneNumber: z.string().optional(),
    address: z.string().optional(),
    role: z.enum(['user', 'admin']).default("user").optional()
});

export const updateUserSchema = createUserSchema.partial();