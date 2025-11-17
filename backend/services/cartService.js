import Cart from "../db/models/Cart.js"
import Product from '../db/models/Product.js';

const calculateTotal = (cart) => {
    cart.total = cart.items.reduce((sum, item) => {
        return sum + item.priceSnapshot * item.quantity;
    }, 0);
    return cart.total;
}


export const getOrCreateCart = async (userId) => {
    let cart = await Cart.findOne({userId}).populate("items.productId");
    if(!cart){
        cart = await Cart.create({userId, items: []});
    }
    return cart
};

export const addItem = async (userId, productId, quantity) => {
    const cart = await getOrCreateCart(userId);

    const product = await Product.findById(productId);
    if(!product) throw new Error("Product not found");

    if(product.stock < quantity) {
        throw new Error("Insufficient stock");
    }

    const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId
    );
    if(existingItem) {
        existingItem.quantity += quantity;
    } else {
        cart.items.push({
            productId,
            quantity,
            priceSnapshot: product.price,
        });
    }

    calculateTotal(cart);
    await cart.save();
    
    return cart;
}


export const updateItemQuantity = async ( userId,itemId, quantity)=> {
    const cart  = await getOrCreateCart(userId);
    const item = cart.items.id(itemId);
    if(!item) throw new Error("Item not found");

    if(quantity < 1) throw new Error("Quantity must be at least 1");

    const product =  await Product.findById(item.productId);
    if(product.stock < quantity){
        throw new Error("Not enough stock");
    }
    item.quantity = quantity;
    calculateTotal(cart);
    await cart.save();

    return cart;
}


export const removeItem = async(userId, itemId) => {
    const cart = await getOrCreateCart(userId);

    cart.items = cart.items.filter((item) => item._id.toString() !== itemId);

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
    const cart =  await getOrCreateCart(userId);
    for(const guestItem of guestItems){
        await addItem(userId, guestItem.productId, guestItem.quantity);
    }

    await cart.save();
    return cart
}
