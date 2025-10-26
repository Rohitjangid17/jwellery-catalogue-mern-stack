import { useEffect, useState } from "react";
import ProductCard from "./ProductCard"
import axios from 'axios';
import { API_BASE_URL } from "../../../constants";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        // getProducts();
        const timer = setTimeout(() => getProducts(), 2000);
        return () => clearTimeout(timer);
    }, []);

    // get product
    const getProducts = async () => {
        setIsLoader(true);
        try {
            const response = await axios.get(`${API_BASE_URL}/product`);
            setProducts(response.data.products || []);
        } catch (error) {
            setProducts([]);
            console.error("API Error:", error.message);
        } finally {
            setIsLoader(false);
        }
    }

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {isLoader
                        ? Array.from({ length: 4 }).map((_, index) => (
                            <ProductCard key={index} loading />
                        ))
                        : products.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))}
                </div>
                {/* {products.length > 0 ? (
                   
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center py-20">
                        <img
                            src="/no-products.png"
                            alt="No Products"
                            className="w-48 h-48 mb-6"
                        />
                        <h2 className="text-2xl font-semibold text-black mb-2">
                            No Products Available
                        </h2>
                        <p className="text-black mb-6 text-center px-4">
                            We couldn't find any products at the moment. Please check back later or explore other categories.
                        </p>
                    </div>
                )} */}
            </div>
        </section>
    )
}

export default Product