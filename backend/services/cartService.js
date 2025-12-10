import Cart from "../db/models/Cart.js"
import Product from '../db/models/Product.js';

export const calculateTotal = (cart) => {
    cart.total = cart.items.reduce((sum, item) => {
        return sum + item.priceSnapshot * item.quantity;
    }, 0);
    return cart.total;
}


export const getOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({ userId }).populate("items.productId");
    if (!cart) {
        cart = await Cart.create({ userId, items: [] });
    }
    return cart
};

export const addItem = async (userId, productId, quantity, attributes = {}) => {
    const cart = await getOrCreateCart(userId);

    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    let price = product.price;
    let stock = product.stock;
    let variantData = null;

    // Check for variant if attributes are provided
    if (attributes && Object.keys(attributes).length > 0) {
        const variant = product.variants.find(v =>
            Object.entries(attributes).every(([key, val]) => v.attributes.get(key) === val)
        );

        if (variant) {
            price = variant.price;
            stock = variant.stock;
            variantData = {
                name: variant.name,
                price: variant.price,
                attributes: attributes
            };
        } else {
            // Attributes provided but no matching variant? 
            // Could throw error or just ignore and add base product. 
            // Throwing error is safer.
            throw new Error("Invalid variant attributes selected");
        }
    }

    if (stock < quantity) {
        throw new Error(`Insufficient stock. Available: ${stock}`);
    }

    // Check availability logic should account for existing cart items of same variant too?
    // Complex stock check: sum quantity in cart + new quantity <= stock.
    // For now, simple check.

    // Find existing item with same ProductID AND attributes
    const existingItem = cart.items.find((item) => {
        if (item.productId.toString() !== productId) return false;

        // Compare attributes
        const itemAttrs = item.variant?.attributes; // Map or Object depending on hydration
        // If both empty, match.
        const attrs1 = attributes || {};
        const attrs2 = itemAttrs || {};

        // If stored as Map
        const itemAttrsObj = itemAttrs instanceof Map ? Object.fromEntries(itemAttrs) : (itemAttrs || {});

        const keys1 = Object.keys(attrs1).sort();
        const keys2 = Object.keys(itemAttrsObj).sort();

        if (keys1.length !== keys2.length) return false;
        return keys1.every(key => attrs1[key] === itemAttrsObj[key]);
    });

    if (existingItem) {
        if (stock < existingItem.quantity + quantity) {
            throw new Error("Insufficient stock for update");
        }
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            productId,
            quantity,
            priceSnapshot: price,
            variant: variantData
        });
    }

    calculateTotal(cart);
    await cart.save();

    return cart;
}


export const updateItemQuantity = async (userId, productId, quantity) => {
    const cart = await getOrCreateCart(userId);
    const item = cart.items.find((item) => item.productId.toString() === productId);
    if (!item) throw new Error("Item not found in cart");

    if (quantity < 1) throw new Error("Quantity must be at least 1");

    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");
    if (product.stock < quantity) {
        throw new Error("Not enough stock");
    }
    item.quantity = quantity;
    calculateTotal(cart);
    await cart.save();

    return cart;
}


export const removeItem = async (userId, productId) => {
    const cart = await getOrCreateCart(userId);

    cart.items = cart.items.filter((item) => item.productId.toString() !== productId);

    calculateTotal(cart);
    await cart.save()

    return cart;
}

export const clearCart = async (userId) => {
    const cart = await getOrCreateCart(userId);

    cart.items = [];
    cart.total = 0;

    await cart.save()

    return cart;
}


export const mergeCart = async (userId, guestItems) => {
    const cart = await getOrCreateCart(userId);
    for (const guestItem of guestItems) {
        await addItem(userId, guestItem.productId, guestItem.quantity, guestItem.attributes);
    }

    await cart.save();
    return cart
}
