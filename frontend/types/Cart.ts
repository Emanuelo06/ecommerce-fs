
import Product from "./Product";

interface cartItem {
    product: Product;
    quantity: number;
    price: number; // Changed from priceSnapshot to match usage in components
}

interface Cart {
    userId: string;
    items: cartItem[];
    totalPrice: number;
}

export default Cart;