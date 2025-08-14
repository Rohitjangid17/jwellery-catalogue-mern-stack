import CustomSelect from "../CustomSelect";
import ProductCard from "../product/ProductCard";
import SidebarFilters from "./filters/SidebarFilters";
import axios from 'axios';
import { useEffect, useState } from "react";

const sortOptions = [
    { value: "default", label: "Sort By (Default)" },
    { value: "priceLowHigh", label: "Price: Low to High" },
    { value: "priceHighLow", label: "Price: High to Low" },
    { value: "latest", label: "Latest First" },
]

const ShopSection = () => {
    const [products, setProducts] = useState([]);
    const [isLoader, setIsLoader] = useState(false);

    useEffect(() => {
        getProducts();
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
            console.error("API Error:", err.message);
        } finally {
            setIsLoader(false);
        }
    }

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
                        <div className="grid grid-cols-3 gap-6">
                            {isLoader
                                ? Array.from({ length: 2 }).map((_, index) => (
                                    <ProductCard key={index} loading />
                                ))
                                : products.map((product, index) => (
                                    <ProductCard key={index} product={product} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ShopSection