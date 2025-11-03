import { Button, Pagination, Select, Drawer } from "antd";
import ProductCard from "../product/ProductCard";
import SidebarFilters from "./filters/SidebarFilters";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { FiList } from "react-icons/fi";
import { productService } from "../../../../services/productService";

const { Option } = Select;

const ShopSection = () => {
    const [products, setProducts] = useState([]);
    const [isLoader, setIsLoader] = useState(true);
    const [selectedSortBy, setSelectedSortBy] = useState("default")
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const total = 50;
    const pageSize = 9;
    const current = 1;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (selectedSortBy === "default") {
                getAllProducts();
            } else {
                getSortedProducts(selectedSortBy);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [selectedSortBy]);

    // get all products
    const getAllProducts = async () => {
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

    // get sorted product
    const getSortedProducts = async (sort_by) => {
        setIsLoader(true);
        try {
            const response = await productService.getSortedProducts(sort_by);
            setProducts(response.products || []);
            console.log("Sorted Products:", response.products);
        } catch (error) {
            console.error("API Error:", error.message);
            setProducts([]);
        } finally {
            setIsLoader(false);
        }
    };

    const itemRender = (page, type, originalElement) => {
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
        return originalElement;
    };

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-12 gap-10">
                    <div className="col-span-3 hidden lg:block">
                        <SidebarFilters />
                    </div>

                    <div className="col-span-12 lg:col-span-9">
                        <div className="flex items-center gap-1.5 mb-10">
                            <Button type="default" size="large" onClick={() => setIsDrawerOpen(true)} className="lg:hidden flex items-center gap-2 transition-all duration-300 ease-in-out !text-black rounded-full !border !border-[#EBEBEE] hover:!border-black">
                                <FiList size={18} />
                                Filter
                            </Button>
                            <div className="max-w-[244px]">
                                <Select value={selectedSortBy} onChange={(value) => setSelectedSortBy(value)} size="large"
                                    className="w-full !shadow-none [&_.ant-select-selector]:!shadow-none rounded-full [&_.ant-select-selector]:!rounded-full [&_.ant-select-selector]:!border-[#EBEBEE] hover:[&_.ant-select-selector]:!border-black focus:[&_.ant-select-selector]:!border-black focus:[&_.ant-select-selector]:!shadow-none transition-all duration-300 ease-in-out">
                                    <Option value="default" disabled>
                                        Sort By (Default)
                                    </Option>
                                    <Option value="title_asc">Title Ascending</Option>
                                    <Option value="title_desc">Title Descending</Option>
                                    <Option value="price_asc">Price Ascending</Option>
                                    <Option value="price_desc">Price Descending</Option>
                                </Select>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                            {isLoader
                                ? Array.from({ length: 9 }).map((_, index) => (
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

            <Drawer
                title="Filter"
                placement="left"
                open={isDrawerOpen}
                onClose={() => setIsDrawerOpen(false)}
                width={300}
                bodyStyle={{ padding: "16px" }}
            >
                <SidebarFilters />
            </Drawer>
        </section >
    )
}

export default ShopSection