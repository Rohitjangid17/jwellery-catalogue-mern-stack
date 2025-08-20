import { useEffect, useState } from "react";
import ProductCard from "./ProductCard"
import axios from 'axios';
import { API_BASE_URL } from "../../../constants";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        getProducts();
    }, []);

    // get product
    const getProducts = async () => {
        setIsLoader(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/product`);
            setProducts(response.data.products || []);
        } catch (error) {
            setProducts([]);
            console.error("API Error:", err.message);
        } finally {
            setIsLoader(false);
        }
    }

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {isLoader
                        ? Array.from({ length: 2 }).map((_, index) => (
                            <ProductCard key={index} loading />
                        ))
                        : products.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                </div>
            </div>
        </section>
    )
}

export default Product