import { Tooltip } from "antd";
import { HiOutlineShoppingBag } from "react-icons/hi";

const BrandCard = () => {
    return (
        <div className="relative flex flex-col gap-5 group w-fit mx-auto">
            {/* Image */}
            <div className="overflow-hidden">
                <img
                    src="/assets/images/category/brand-1.jpg"
                    alt="brand"
                    className="mx-auto scale-100 group-hover:scale-105 transition-all duration-500 ease-in-out"
                />
            </div>

            {/* Hover Icon */}
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <Tooltip title="View Product" placement="top" color="black">
                    <div className="bg-white hover:bg-black p-3 rounded-full shadow-md transition-colors duration-300 cursor-pointer">
                        <HiOutlineShoppingBag className="text-black hover:text-white text-xl" />
                    </div>
                </Tooltip>
            </div>
        </div>
    );
};

export default BrandCard;
