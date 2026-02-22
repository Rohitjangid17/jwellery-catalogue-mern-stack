import { useEffect, useState } from "react";
import ProductCard from "./ProductCard"
import axios from 'axios';
import { API_BASE_URL, SOMETHING_WENT_WRONG } from "../../../constants";
import { notification } from "antd";
import { cartService } from "../../../../services/cartService";

const Product = () => {
    const [messageApi, contextHolder] = notification.useNotification();

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

    // calculate final price
    const calculateFinalPrice = (product) => {
        const basePrice = product.basePrice || 0;
        const discountAmount = product?.discount?.amount || 0;
        const discountType = product?.discount?.type || "none";

        if (discountType === "flat") {
            return Math.max(basePrice - discountAmount, 0);
        }

        if (discountType === "percent") {
            return Math.max(basePrice - (basePrice * discountAmount) / 100, 0);
        }

        return basePrice;
    }

    // add to cart product
    const addToCartProduct = async (product) => {
        try {
            console.log("add to cart product com ", product);

            const payload = {
                productId: product._id,

                size: {
                    size: product?.selectedSize || "",
                    priceModifier: product?.selectedSizePriceModifier || 0,
                },

                color: product?.selectedColor || "",

                metalType: product?.selectedMetalType || "Gold",

                gemstones: product?.selectedGemstones || [],

                price: {
                    basePrice: product.basePrice,
                    discount: product?.discount?.amount || 0,
                    finalPrice: calculateFinalPrice(product),
                },

                quantity: 1,

                snapshot: {
                    title: product.title,
                    sku: product.sku,
                    images: product.images,
                    category: product.category,
                    weightInGrams: product.weightInGrams,
                    materials: product.materials || [],
                },

                customization: {
                    engravingText: "",
                    specialInstructions: "",
                },
            };

            const response = await cartService.addToCart(payload);
            console.log("add to cart response ", response)

        } catch (error) {
            messageApi.error({
                message: "Server Error",
                description:
                    error?.response?.data?.message ?? SOMETHING_WENT_WRONG,
                placement: "topRight",
            });
        }
    }

    return (
        <>
            {contextHolder}
            <section className="py-8 sm:py-12 px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                        {isLoader
                            ? Array.from({ length: 4 }).map((_, index) => (
                                <ProductCard key={index} loading />
                            ))
                            : products.map((product, index) => (
                                <ProductCard key={index} product={product} onAddToCart={addToCartProduct} />
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
        </>
    )
}

export default Product