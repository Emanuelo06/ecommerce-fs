
interface cartItem {
    productId: string;
    quantity: number;
    priceSnapshot: number;
}

interface Cart {
    userId: string;
    items: cartItem[];
    totalPrice: number;
}

export default Cart;