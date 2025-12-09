

interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images: string[];
    createdAt: Date;
}

export default Product;