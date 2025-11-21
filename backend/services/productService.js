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

export const queryProduct = async (query) => {
    
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 20;
    const skip = (page -1) * limit;

    const filters = {}
    if(query.category){
        filters.category = query.category
    }
    if(query.minPrice || query.maxPrice){
        filters.price = {};
        if(query.minPrice) filters.price = Number(query.minPrice);
        if(query.maxPrice) filters.price = Number(query.maxPrice)
    }

    if(query.search){
        filters.$or = [
            {name: {$regex: querySearch, $options: "i"}},
            {description: {$regex: querySearch, $options: "i"}},
        ];
    }

    let sort = {}
    switch(query.sort){
        case "price-asc":
            sort = {price: 1};
            break;
        case "price-desc":
            sort = {price : -1};
            break;
        case "newest":
            sort = {createdAt : -1};
            break;
        default:
            sort = {createdAt : -1};
    }

    const products = await Product.find(filters)
    .sort(sort)
    .skip(skip)
    .limit(limit)

    const total = await Product.countDocuments(filters);

    return {
        page,
        limit,
        total,
        totalPages: Math.ceil(total/limit),
        results: products.length,
        products
    };
};