import Product from "./Product"

interface Order {
    products: Product[];
    userId: string;
    shippingInfo: {
        username: string;
        address: string;
        phoneNumber: string;
        email: string;
    },
    totalAmount: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled" | "refunded";
    createdAt: Date;
}

export default Order;