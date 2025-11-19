import Product from "../db/models/Product";
import cloudinary from "../config/cloudinary";



export const addProductImages = async(productId, files, isFeatured) => {
    const product = await Product.findById(productId);
    if(!product) throw new Error("Product not found");

    let uploadedUrls = [];

    for (const file of files){
        const uploaded = await cloudinary.uploader.upload(file.path, {
            folder: "products",
            transformation: [
                {width:1000, height:1000, crop: "limit"},
                {quality: "auto"},
                {fetch_format: "auto"}
            ]
        });

        uploadedUrls.push(uploaded.secure_url);
    }

    product.images.push(...uploadedUrls);

    if(isFeatured === "true"){
        const newFeatured = product.images.pop();
        product.images.unshift(newFeatured);
    }

    await product.save();
    return product;
};


export const deleteProductImage = async(productId, imageUrl) => {
    const product = await Product.findById(productId);
    if (!product) throw new Error("Product not found");

    //extract public_id from CLOUDINARY URL
    const publicId = imageUrl.split("/").pop().split(".")[0];

    product.images = product.images.filter((img) => img !== imageUrl);

    await product.save();
    return product;
};