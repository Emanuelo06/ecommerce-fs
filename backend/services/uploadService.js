import Product from "../db/models/Product";

export const addProductImages = async(productId, imageUrls) => {
    const product = await Product.findById(productId);
    if(!product) throw new Error("Product now found");

    product.images.push(...imageUrls);

    await product.save
    return product;
}