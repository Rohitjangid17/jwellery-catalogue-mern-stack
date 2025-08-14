import { Button } from "antd";

const LookCard = ({ title, currentPrice, oldPrice, image }) => {
    return (
        <div className="w-full">
            <img src={image} alt={title} className="w-full h-auto object-cover" />

            <div className="py-5 flex flex-col items-center gap-2">
                <h2 className="text-sm text-center text-black">{title}</h2>
                <div className="flex items-center gap-2 text-base">
                    <p className="text-[#ff6f61] font-medium">${currentPrice.toFixed(2)}</p>
                    <p className="text-gray-500 line-through">${oldPrice.toFixed(2)}</p>
                </div>
                <Button size="large" className="w-full text-base font-medium px-6 py-2 !bg-transparent !text-[#b99f4a] !border !border-[#b99f4a] rounded-none hover:!bg-[#b99f4a] hover:!text-white transition duration-300">
                    Add to Cart
                </Button>
            </div>
        </div>
    );
};

export default LookCard;
