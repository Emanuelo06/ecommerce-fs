import Product from "../db/models/Product.js"


export const getProducts = async ()=> {
    const products = await Product.find()
    if(products.lenght === 0){
     throw new Error("No products Available")
    }
    return products
}
export const getProduct = async (productId) => {
    const product = await Product.findById(productId)
    if(!product){
        throw new Error("Product not found")
    }   
    return product
}

export const createProduct = async (productData) => {
    const newProduct = new Product(productData);
    await newProduct.save();
    return newProduct;
};
export const updateProduct = async (productId, productData) => {
    const updatedProduct = await Product.findByIdAndUpdate(productId, productData, { new: true });
    if (!updatedProduct) {
        throw new Error("Product not found");
    }
    return updatedProduct;
}

export const deleteProduct = async (productId) => {
    const deletedProduct = await Product.findByIdAndDelete(productId);
    if (!deletedProduct) {
        throw new Error("Product not found");
    }
    return deletedProduct;
}