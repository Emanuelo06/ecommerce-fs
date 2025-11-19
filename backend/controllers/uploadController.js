import { addProductImages } from "../services/uploadService";

export const uploadProductImages = async (req, res)=> {
    try{
        const productId = req.params.id;

        if(!req.files || req.files.length === 0) {
            return res.status(400).json({message: "No files uploaded"})
        }
        const imageUrls = req.files.map((file) => file.path);

        const product = await addProductImages(productId, imageUrls);

        res.status(200).json({
            message: "Images uploaded successfully",
            product,
        });
    } catch (err) {
        res.status(400).json({ message: err.message})
    }
};