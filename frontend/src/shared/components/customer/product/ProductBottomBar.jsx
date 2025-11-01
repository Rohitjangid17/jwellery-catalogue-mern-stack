import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Input, Select } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;

const ProductBottomBar = () => {
    const [showBar, setShowBar] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [selectedOption, setSelectedOption] = useState("default");

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 400 && currentScrollY > lastScrollY) {
                setShowBar(true);
            }
            if (currentScrollY < 200) {
                setShowBar(false);
            }

            setLastScrollY(currentScrollY);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [lastScrollY]);

    return (
        <section className={`fixed bottom-0 left-0 w-full px-4 py-[14px] bg-white shadow-[4px_-4px_5px_rgba(0,0,0,0.03)] z-50 transition-all duration-500 ease-in-out ${showBar ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
            }`}>
            <div className="container mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-[5px]">
                    <div className="hidden sm:flex gap-4 items-center justify-center sm:justify-start">
                        <div className="w-[72px] h-[72px]">
                            <img src="http://localhost:5000/uploads/products/5-1761994829551.webp" className="w-full h-full object-cover rounded-full" alt="Product image" />
                        </div>
                        <p className="text-base text-black font-normal">Elegant Gold Necklace</p>
                    </div>
                    <div className="flex gap-3 items-center flex-wrap sm:flex-nowrap justify-center lg:justify-end">
                        <div className="min-w-[249px]">
                            <Select value={selectedOption} onChange={(value) => setSelectedOption(value)} size="large"
                                className="w-full !shadow-none [&_.ant-select-selector]:!shadow-none rounded-full [&_.ant-select-selector]:!rounded-full [&_.ant-select-selector]:!border-[#EBEBEE] hover:[&_.ant-select-selector]:!border-black focus:[&_.ant-select-selector]:!border-black focus:[&_.ant-select-selector]:!shadow-none transition-all duration-300 ease-in-out">
                                <Option value="default" disabled>
                                    Select Size
                                </Option>
                                <Option value="small">Small</Option>
                                <Option value="medium">Medium</Option>
                                <Option value="large">Large</Option>
                            </Select>
                        </div>

                        <div className="flex items-center justify-between bg-[#f1f1f1] rounded-full">
                            <Button
                                type="default"
                                icon={<MinusOutlined className="text-[22px]" />}
                                size="small"
                                onClick={() => console.log("minus cliked")}
                                className="!bg-transparent !w-[42px] h-12 border-none rounded-sm !shadow-none !text-black hover:!text-[#ff6f61] transition-all duration-300 ease-in-out"
                            />
                            <Input className="w-[42px] h-12 !bg-transparent border-none pointer-events-none !text-black font-medium text-[22px]" value={6} />
                            <Button
                                type="default"
                                icon={<PlusOutlined className="text-[22px]" />}
                                size="small"
                                onClick={() => console.log("plus cliked")}
                                className="!bg-transparent !w-[42px] h-12 border-none rounded-sm !shadow-none !text-black hover:!text-[#ff6f61] transition-all duration-300 ease-in-out"
                            />
                        </div>
                        <Button type="button" size="large" className="min-w-48 !font-medium bg-black text-white rounded-full hover:!bg-[#ff6f61] transition-all duration-300 ease-in-out">Add to cart</Button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductBottomBar;
