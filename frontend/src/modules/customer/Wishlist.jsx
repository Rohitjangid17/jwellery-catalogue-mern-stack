import { useEffect, useState } from "react";
import CommonBanner from "../../shared/components/customer/banner/CommonBanner";
import ProductCard from "../../shared/components/customer/product/ProductCard";
import axios from 'axios';
import { API_BASE_URL } from "../../shared/constants";

const Wishlist = () => {
    const [products, setProducts] = useState([]);
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        getProducts();
        // const timer = setTimeout(() => getProducts(), 2000);
        // return () => clearTimeout(timer);
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
        <>
            <CommonBanner title="Wishlist" />

            <section className="py-16 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                        {isLoader
                            ? Array.from({ length: 4 }).map((_, index) => (
                                <ProductCard key={index} loading />
                            ))
                            : products.map((product, index) => (
                                <ProductCard key={index} product={product} isWishlist={true} />
                            ))}
                    </div>
                </div>
            </section>
        </>
    )
}

export default Wishlist;