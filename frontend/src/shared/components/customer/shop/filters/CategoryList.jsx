import axios from "axios";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { API_BASE_URL } from "../../../../constants";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [isLoader, setIsLoader] = useState(false);

    useEffect(() => {
        getCategoryList();
    }, []);

    const getCategoryList = async () => {
        try {
            setIsLoader(true);
            const response = await axios.get(`${API_BASE_URL}/category`);
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
        } finally {
            setTimeout(() => {
                setIsLoader(false);
            }, 5000);
        }
    }

    return (
        <ul className="space-y-[12px]">
            {isLoader
                ? Array.from({ length: 5 }).map((_, index) => (
                    <li key={index}>
                        <Skeleton height={15} style={{ width: "100%" }} />
                    </li>
                ))
                : categories.map((category, index) => (
                    <li key={index} className="cursor-pointer capitalize text-sm text-black hover:text-[#ff6f61] transition duration-300 ease-in-out">
                        {category?.title} (20)
                    </li>
                ))}
        </ul>
    );
};

export default CategoryList;
