import { addProductImages, deleteProductImage } from "../services/uploadService.js";

export const uploadProductImages = async ( req, res) => {
    try{
        const productId = req.params.id;
        const isFeatured = req.body.isFeatured || "false";

        if(!req.files || req.files.length === 0){
            return res.status(400).json({message: "No files uploaded"});
        }

        const product = await addProductImages(productId, req.files, isFeatured);

        res.status(200).json({
            message: "Images uploaded successfully",
            product
        });
    } catch (err){
        res.status(400).json({message: err.message});
    }
}


export const removeProductImage = async(req, res) => {
    try{
        const productId = req.params.id;
        const {imageUrl} = req.body;

        if(!imageUrl){
            return res.status(400).json({ message: "Image URL is required"});
        }

        const product = await deleteProductImage(productId, imageUrl);

        res.status(200).json({
            message: "Image deleted successfully",
            product,
        });
    } catch(err){
        res.status(400).json({ message: err.message});
    }
};