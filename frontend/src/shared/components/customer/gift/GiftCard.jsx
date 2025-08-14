import { MdOutlineCurrencyRupee } from "react-icons/md";
import { LuArrowUpRight } from "react-icons/lu";

const GiftCard = () => {
    return (
        <div className="flex flex-col group">
            <div className="overflow-hidden">
                <img
                    src="/assets/images/product/product-9.jpg"
                    alt="Gift Card"
                    className="mx-auto scale-100 group-hover:scale-105 transition-opacity duration-500 ease-in-out 
                               [transition:opacity_0.5s_ease,transform_2s_cubic-bezier(0,0,.44,1.18)]"
                />
            </div>
            <a href="#" className="text-4xl text-black hover:text-[#ff6f61] font-normal flex items-center justify-center uppercase mt-8 transition-all duration-300 ease-in-out">
                gift under <MdOutlineCurrencyRupee /> 150.00
            </a>
            <a href="#" className="group text-black hover:text-[#ff6f61] uppercase text-center mt-6 text-base font-normal flex items-center justify-center transition-all duration-300 ease-in-out">
                <span className="border-b border-black group-hover:border-[#ff6f61] flex items-center gap-1 transition-all duration-300 ease-in-out">
                    SHOP NOW <LuArrowUpRight />
                </span>
            </a>
        </div>
    )
}

export default GiftCard;