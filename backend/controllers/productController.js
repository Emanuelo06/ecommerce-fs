import productService from "../services/productService.js"


export const getProducts = async (req, res) => {
    try{
        const products = await  productService.getProducts()
        res.status(200).json(products)
    } catch (error){
        res.status(404).json({message: error.message})
    }

}
export const getProduct = async (req, res) => {
    try{
        const productId = req.params.id
        const product = await productService.getProduct(productId)
        res.status(200).json(product)
    } catch (error){
        res.status(404).json({message: error.message})
    }
}

export const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};
export const updateProduct = async (req, res) => {
    try {
        const updatedProduct = await productService.updateProduct(req.params.id, req.body);
        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }   
};

export const deleteProduct = async(req, res) => {
    try{
        const productId = req.params.id
        const deleteProduct = productService.deleteProduct(productId)
        res.status(200).json({message: "Product deleted successfully"})
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}