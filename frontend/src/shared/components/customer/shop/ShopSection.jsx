import { Button, Pagination, Select, Drawer } from "antd";
import ProductCard from "../product/ProductCard";
import SidebarFilters from "./filters/SidebarFilters";
import axios from 'axios';
import React, { useEffect, useState } from "react";
import { FiList, FiPackage } from "react-icons/fi";
import { productService } from "../../../../services/productService";

const { Option } = Select;

const ShopSection = () => {
    const [products, setProducts] = useState([]);
    const [isLoader, setIsLoader] = useState(true);
    const [selectedSortBy, setSelectedSortBy] = useState("default")
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [categoryId, setCategoryId] = useState(null);

    const total = 50;
    const pageSize = 9;
    const current = 1;

    useEffect(() => {
        const timer = setTimeout(() => {
            if (categoryId) {
                getProductsByCategory(categoryId);
            } else if (selectedSortBy === "default") {
                getAllProducts();
            } else {
                getSortedProducts(selectedSortBy);
            }
        }, 2000);
        return () => clearTimeout(timer);
    }, [selectedSortBy, categoryId]);

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

    // get products by category
    const getProductsByCategory = async (category_id) => {
        setIsLoader(true);
        try {
            const response = await productService.getProductsByCategory(category_id);
            setProducts(response.products || []);
            console.log("Category Products:", response.products);
        } catch (error) {
            console.error("API Error:", error.message);
            setProducts([]);
        } finally {
            setIsLoader(false);
        }
    }

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
                        <SidebarFilters onCategorySelect={(id) => setCategoryId(id)} />
                    </div>

                    <div className="col-span-12 lg:col-span-9">
                        <div className="flex items-center gap-1.5 mb-10">
                            <Button type="default" size="large" onClick={() => setIsDrawerOpen(true)} className="lg:hidden flex items-center gap-2 transition-all duration-300 ease-in-out !text-black rounded-full !border !border-[#EBEBEE] hover:!border-black">
                                <FiList size={18} />
                                Filter
                            </Button>
                            <div className="max-w-[220px] min-w-[244px]">
                                <Select value={selectedSortBy} onChange={(value) => setSelectedSortBy(value)} size="large"
                                    className="w-full !shadow-none [&_.ant-select-selector]:!shadow-none rounded-full [&_.ant-select-selector]:!rounded-full [&_.ant-select-selector]:!border-[#EBEBEE] hover:[&_.ant-select-selector]:!border-black focus:[&_.ant-select-selector]:!border-black focus:[&_.ant-select-selector]:!shadow-none transition-all duration-300 ease-in-out">
                                    <Option value="default">
                                        Sort By (Default)
                                    </Option>
                                    <Option value="title_asc">Title Ascending</Option>
                                    <Option value="title_desc">Title Descending</Option>
                                    <Option value="price_asc">Price Ascending</Option>
                                    <Option value="price_desc">Price Descending</Option>
                                </Select>
                            </div>
                        </div>

                        {isLoader ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {Array.from({ length: 9 }).map((_, index) => (
                                    <ProductCard key={index} loading />
                                ))}
                            </div>
                        ) : products.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                                {products.map((product, index) => (
                                    <ProductCard key={index} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-center">
                                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-[#f5f5f5] mb-4">
                                    <FiPackage size={40} className="text-[#ff6f61]" />
                                </div>
                                <h2 className="text-2xl font-semibold text-black mb-2">
                                    No Products Found
                                </h2>
                                <p className="text-[#0009] max-w-sm">
                                    We couldn’t find any products matching your filter or search. Try clearing filters or explore another category.
                                </p>
                            </div>
                        )}

                        <div className="flex items-center justify-center gap-2">
                            <Pagination
                                total={total}
                                pageSize={pageSize}
                                current={current}
                                showSizeChanger={false}
                                itemRender={itemRender}
                            />
                        </div>
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