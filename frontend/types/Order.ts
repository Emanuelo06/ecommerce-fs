import Product from "./Product"

interface Order {
    _id: string;
    id?: string;
    products: Product[];
    userId: string;
    shippingInfo: {
        username: string;
        address: string;
        phoneNumber: string;
        email: string;
    },
    totalAmount: number;
    totalPrice: number; // Backend might return this, keeping both for compatibility
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
    createdAt: Date | string; // API might return string
}

export default Order;