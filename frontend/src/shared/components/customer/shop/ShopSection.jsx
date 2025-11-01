import { Pagination } from "antd";
import CustomSelect from "../CustomSelect";
import ProductCard from "../product/ProductCard";
import SidebarFilters from "./filters/SidebarFilters";
import axios from 'axios';
import React, { useEffect, useState } from "react";

const sortOptions = [
    { value: "default", label: "Sort By (Default)" },
    { value: "priceLowHigh", label: "Price: Low to High" },
    { value: "priceHighLow", label: "Price: High to Low" },
    { value: "latest", label: "Latest First" },
]

const ShopSection = () => {
    const [products, setProducts] = useState([]);
    const [isLoader, setIsLoader] = useState(false);

    const total = 50;
    const pageSize = 9;
    const current = 1;

    useEffect(() => {
        // getProducts();
        const timer = setTimeout(() => getProducts(), 2000);
        return () => clearTimeout(timer);
    }, []);

    // get product
    const getProducts = async () => {
        setIsLoader(true);
        try {
            const response = await axios.get("http://localhost:5000/api/v1/product");
            setProducts(response.data.products || []);
            console.log("product data ", response.data.products);
        } catch (error) {
            setProducts([]);
            console.error("API Error:", error.message);
        } finally {
            setIsLoader(false);
        }
    }

    const itemRender = (page, type, originalElement) => {
        // Preserve AntD behavior; just add our classes
        if (type === "page") {
            return React.cloneElement(originalElement, {
                className: `${originalElement.props.className || ""} circle-page`,
            });
        }
        if (type === "prev" || type === "next") {
            return React.cloneElement(originalElement, {
                className: `${originalElement.props.className || ""} circle-nav`,
            });
        }
        // jump-prev / jump-next etc.
        return originalElement;
    };

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-3 ">
                        <SidebarFilters />
                    </div>

                    <div className="col-span-9">
                        <div className="flex items-center justify-between mb-6">
                            <CustomSelect
                                options={sortOptions}
                                value={"default"}
                                onChange={(val) => console.log("Selected:", val)}
                            />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {isLoader
                                ? Array.from({ length: 2 }).map((_, index) => (
                                    <ProductCard key={index} loading />
                                ))
                                : products.map((product, index) => (
                                    <ProductCard key={index} product={product} />
                                ))}
                        </div>

                        <div className="flex items-center justify-center gap-2">
                            <Pagination
                                total={total}
                                pageSize={pageSize}
                                current={current}
                                showSizeChanger={false}
                                itemRender={itemRender}
                            />
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
                </div>
            </div>
        </section>
    )
}

export default ShopSection