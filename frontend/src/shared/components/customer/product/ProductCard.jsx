import {
    MdOutlineCurrencyRupee,
    MdCompareArrows,
} from "react-icons/md";
import { FiHeart, FiEye } from "react-icons/fi";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import { Tooltip } from "antd";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const ProductCard = ({ product = {}, loading = false }) => {
    const actions = [
        { icon: <HiOutlineShoppingBag size={18} />, label: "Add to Cart" },
        { icon: <FiHeart size={18} />, label: "Add to Wishlist" },
        { icon: <FiEye size={18} />, label: "Quick View" },
        { icon: <MdCompareArrows size={18} />, label: "Add to Compare" },
    ];

    const title = product?.title || "Untitled Product";
    const images = product?.images || [];
    const defaultImage = images[0] || "/assets/images/product/ring.jpg";
    const hoverImage = images[4] || images[1] || defaultImage;
    const basePrice = product?.basePrice || 0;
    const discount = product?.discount || {};
    const discountAmount = discount?.amount || 0;
    const discountType = discount?.type || "none";

    let finalPrice = basePrice;
    if (discountType === "flat") {
        finalPrice = basePrice - discountAmount;
    } else if (discountType === "percent") {
        finalPrice = basePrice - (basePrice * discountAmount) / 100;
    }

    return (
        <div className="relative group">
            {/* Image Area */}
            <div className="relative overflow-hidden w-full">
                {loading ? (
                    <Skeleton height={250} />
                ) : (
                    <>
                        <Link to={`/product-details/${product?._id}`}>
                            <img
                                src={defaultImage}
                                alt={title}
                                className="w-full h-auto transition-opacity ease-in-out duration-500 group-hover:opacity-0"
                            />
                        </Link>

                        <Link to={`/product-details/${product?._id}`}>
                            <img
                                src={hoverImage}
                                alt={title}
                                className="absolute top-0 left-0 w-full h-auto opacity-0 transition-opacity ease-in-out duration-500 group-hover:opacity-100"
                            />
                        </Link>

                        {/* Action Buttons */}
                        <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            {actions.map((action, idx) => (
                                <Tooltip
                                    key={idx}
                                    title={
                                        <span style={{ fontSize: "11px" }}>
                                            {action.label}
                                        </span>
                                    }
                                    placement="left"
                                >
                                    <button className="p-2 bg-white shadow-md rounded-full hover:bg-black hover:text-white transition duration-300">
                                        {action.icon}
                                    </button>
                                </Tooltip>
                            ))}
                        </div>
                    </>
                )}
            </div>

            <div className="flex flex-col gap-[10px] py-4">
                {loading ? (
                    <>
                        <Skeleton height={20} width="80%" />
                        <Skeleton height={20} width="60%" />
                    </>
                ) : (
                    <>
                        <Link
                            to={`/product-details/${product?._id}`}
                            className="text-base leading-[24px] font-normal text-black hover:text-[#ff6f61] transition-colors duration-300"
                        >
                            {title}
                        </Link>
                        <div className="flex items-center gap-1">
                            <p className="flex items-center text-[#ff6f61] text-base leading-[24px] font-medium">
                                <MdOutlineCurrencyRupee />
                                {Math.max(finalPrice, 0)}
                            </p>
                            {discountType !== "none" && (
                                <p className="flex items-center text-[#1f1f1f] text-base leading-[24px] font-medium line-through">
                                    <MdOutlineCurrencyRupee />
                                    {basePrice}
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ProductCard;