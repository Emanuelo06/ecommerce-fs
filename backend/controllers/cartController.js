import * as cartService from '../services/cartService.js';


export const getCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const cart = await cartService.getOrCreateCart(userId);
        res.status(200).json(cart)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

export const addToCart = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId, quantity, attributes } = req.body;
        const cart = await cartService.addItem(userId, productId, quantity, attributes);
        res.status(200).json(cart)
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const updateCartItem = async (req, res) => {
    try {
        const userId = req.user.id;
        const { productId } = req.params;
        const { quantity } = req.body;

        const cart = await cartService.updateItemQuantity(userId, productId, quantity);
        res.status(200).json(cart)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const removeCartItem = async (req, res) => {
    try {
        const userId = req.user.id
        const { productId } = req.params;
        const cart = await cartService.removeItem(userId, productId);
        res.status(200).json(cart)
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

export const clearCart = async (req, res) => {
    try {
        const userId = req.user.id;

        const cart = await cartService.clearCart(userId);
        res.status(200).json(cart);
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

export const mergeCart = async (req, res) => {
    try {
        const userId = req.user.id; // from isAuth middleware
        const guestItems = req.body.items; // array of { productId, quantity }

        const cart = await cartService.mergeCart(userId, guestItems);
        res.status(200).json({ success: true, cart });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};