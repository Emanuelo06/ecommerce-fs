
import Product from "./Product";

interface cartItem {
    product: Product;
    quantity: number;
    price: number;
    variant?: {
        name: string;
        price: number;
        attributes: Record<string, string>;
    };
    _id?: string;
}

interface Cart {
    userId: string;
    items: cartItem[];
    totalPrice: number;
}

export default Cart;