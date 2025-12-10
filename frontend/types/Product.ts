

interface Product {
    _id: string;
    title: string;
    description: string;
    price: number;
    category: string;
    stock: number;
    images: string[];
    attributes?: {
        name: string;
        values: string[];
    }[];
    variants?: {
        name: string;
        price: number;
        stock: number;
        attributes: Record<string, string>;
        sku?: string;
    }[];
    createdAt: Date;
}

export default Product;