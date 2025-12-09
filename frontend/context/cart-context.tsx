"use client";

import { createContext, useContext } from "react";
import { useAuth } from "@/context/auth-context";
import {
    useAddItemToCartMutation,
    useCartQuery,
    useRemoveCartItemMutation,
    useUpdateCartItemMutation,
} from "@/services/cartQueries";
import { toast } from "sonner";
import Cart from "@/types/Cart";

interface CartContextType {
    cart: Cart | null;
    isLoading: boolean;
    addToCart: (productId: string, quantity: number) => void;
    removeFromCart: (productId: string) => void;
    updateQuantity: (productId: string, quantity: number) => void;
    itemsCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
    const { token, isAuthenticated } = useAuth();

    // Fetch cart only if user is logged in
    const { data: cart, isLoading } = useCartQuery(token || "");

    const { mutate: addItem } = useAddItemToCartMutation();
    const { mutate: removeItem } = useRemoveCartItemMutation();
    const { mutate: updateItem } = useUpdateCartItemMutation();

    const addToCart = (productId: string, quantity: number) => {
        if (!isAuthenticated || !token) {
            toast.error("Please login to add items to cart");
            return;
        }
        addItem(
            { productId, quantity, token },
            {
                onSuccess: () => toast.success("Added to cart"),
                onError: () => toast.error("Failed to add to cart"),
            }
        );
    };

    const removeFromCart = (productId: string) => {
        if (!isAuthenticated || !token) return;
        removeItem(
            { productId, token },
            {
                onSuccess: () => toast.success("Removed from cart"),
                onError: () => toast.error("Failed to remove"),
            }
        );
    };

    const updateQuantity = (productId: string, quantity: number) => {
        if (!isAuthenticated || !token) return;
        if (quantity <= 0) {
            removeFromCart(productId);
            return;
        }
        updateItem(
            { productId, quantity, token },
            {
                onError: () => toast.error("Failed to update quantity"),
            }
        );
    };

    const itemsCount = cart?.items?.reduce((acc, item) => acc + item.quantity, 0) || 0;

    return (
        <CartContext.Provider
            value={{
                cart: cart || null,
                isLoading,
                addToCart,
                removeFromCart,
                updateQuantity,
                itemsCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
}

export function useCart() {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error("useCart must be used within a CartProvider");
    }
    return context;
}
