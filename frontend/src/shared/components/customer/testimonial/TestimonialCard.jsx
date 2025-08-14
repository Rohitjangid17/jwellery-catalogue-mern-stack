import { MdOutlineVerified, MdOutlineCurrencyRupee } from "react-icons/md";
import { AiFillStar } from "react-icons/ai";

const TestimonialCard = () => {
    return (
        <div className="bg-white border border-solid border-[#ebebeb]">
            <div className="p-6 flex flex-col gap-5">
                <div className="flex items-center gap-2">
                    <h2 className="text-sm font-medium">Rohit Jangid</h2>
                    <div className="flex items-center gap-1 text-sm text-[#545454]">
                        <MdOutlineVerified size={16} />
                        <p className="text-xs italic">Verified Buyer</p>
                    </div>
                </div>
                <div className="flex gap-[5px]">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <AiFillStar key={index} color="#98ab23" size={16} />
                    ))}
                </div>

                <p className="text-sm leading-[20px] text-[#545454]">
                    The product quality is amazing and the customer support was super helpful throughout the process.
                    I highly recommend this to anyone looking for reliable service.
                </p>
            </div>
            <hr className="text-[#ebebeb]" />
            <div className="p-6">
                <div className="flex items-center gap-3">
                    <div className="rounded-full overflow-hidden w-16 h-16">
                        <img
                            src="https://vinetanextjs.vercel.app/images/products/jewelry/item-1.jpg"
                            alt="Customer Avatar"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div>
                        <h3 className="text-xs">Item purchased:</h3>
                        <p className="text-sm text-black font-medium">Small Earrings In Gold with Diamond</p>
                        <p className="text-sm text-black font-medium flex items-center"><MdOutlineCurrencyRupee /> 150.00</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TestimonialCard