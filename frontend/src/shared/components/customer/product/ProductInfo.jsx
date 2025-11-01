import { useEffect, useState } from "react";
import Input from "antd/es/input/Input";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { Button, Tooltip } from "antd";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { FiChevronLeft, FiChevronRight, FiGrid, FiHeart, FiMessageCircle, FiShare2, FiShuffle } from "react-icons/fi";
import SwiperSectionLayout from "../swiper/SwiperSectionLayout";
import { productService } from "../../../../services/productService";
import ProductCard from "./ProductCard";
import ProductBottomBar from "./ProductBottomBar";
import { Link } from "react-router-dom";

const product = {
    title: "Elegant Gold Necklace",
    price: 5499,
    description:
        "This handcrafted gold-plated necklace features a traditional design perfect for festive occasions and gifting.",
    rating: 4.5,
    stock: true,
    category: "koton"
};

const productImages = [
    "http://localhost:5000/uploads/products/5-1761994829551.webp",
    "http://localhost:5000/uploads/products/5-1761994829551.webp",
    "http://localhost:5000/uploads/products/5-1761994829551.webp",
    "http://localhost:5000/uploads/products/5-1761994829551.webp",
    "http://localhost:5000/uploads/products/5-1761994829551.webp",
];

const ProductInfo = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [bestSellingProducts, setBestSellingProducts] = useState([]);
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        getBestSellingProducts();
    }, []);


    // get best selling product
    const getBestSellingProducts = async () => {
        setIsLoader(true);
        try {
            const response = await productService.getAllProducts();
            console.log("Best Selling Products:", response.products);
            setBestSellingProducts(response.products);
        } catch (error) {
            console.error("Error fetching best selling products:", error);
            setBestSellingProducts([]);
        } finally {
            setIsLoader(false);
        }
    };

    return (
        <>
            <section className="px-4 py-8">
                <div className="container mx-auto">
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Link to="/home" className="text-[#757575]">Home</Link>
                            <div className="w-4 h-4 flex items-center justify-center">
                                <span className="w-1 h-1 bg-[#757575] rounded-full"></span>
                            </div>
                            <p className="text-black text-sm font-normal">Oval Yellow Diamond Double Halo Engagement Ring</p>
                        </div>
                        <div className="flex items-center gap-2.5">
                            <Tooltip title="Previous Product" placement="bottom">
                                <Button
                                    type="default"
                                    shape="circle"
                                    icon={<FiChevronLeft size={18} />}
                                    className="!min-w-4 !w-auto !text-black !inline-block !bg-transparent !shadow-none !border-none transition-all duration-300 ease-in-out"
                                />
                            </Tooltip>

                            {/* View All Products */}
                            <Tooltip title="View All Products" placement="bottom">
                                <Button
                                    type="default"
                                    shape="circle"
                                    icon={<FiGrid size={20} />}
                                    className="!min-w-4 !w-auto !text-black !inline-block !bg-transparent !shadow-none !border-none transition-all duration-300 ease-in-out"
                                />
                            </Tooltip>

                            {/* Next Product */}
                            <Tooltip title="Next Product" placement="bottom">
                                <Button
                                    type="default"
                                    shape="circle"
                                    icon={<FiChevronRight size={18} />}
                                    className="!min-w-4 !w-auto !text-black !inline-block !bg-transparent !shadow-none !border-none transition-all duration-300 ease-in-out"
                                />
                            </Tooltip>
                        </div>
                    </div>
                </div>
            </section>
            <section className="px-4">
                <div className="container mx-auto">
                    <div className="grid grid-cols-12 gap-6">
                        <div className="col-span-12 md:col-span-6">
                            <div className="grid grid-cols-12 gap-3">
                                {/* Thumbnail List */}
                                <div className="col-span-2">
                                    <div className="flex flex-col gap-3">
                                        {productImages.map((src, index) => (
                                            <img key={index} src={src} alt={`Thumbnail ${index + 1}`} onClick={() => thumbsSwiper?.slideTo(index)} className={`w-full h-full object-cover cursor-pointer border rounded-lg ${activeIndex === index
                                                ? "border-[#ff6f61]" : "border-gray-300"}`} />
                                        ))}
                                    </div>
                                </div>

                                {/* Swiper Carousel */}
                                <div className="col-span-10">
                                    <div className="relative">
                                        <Swiper spaceBetween={10} slidesPerView={1} navigation={{
                                            nextEl: ".custom-swiper-button-next",
                                            prevEl: ".custom-swiper-button-prev",
                                        }} onSwiper={setThumbsSwiper} onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                            modules={[Navigation, Thumbs]}>
                                            {productImages.map((src, index) => (
                                                <SwiperSlide key={index}>
                                                    <img src={src} alt={`Product Image ${index + 1}`} className="w-full h-full object-cover rounded-xl" />
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>

                                        {/* Prev Button */}
                                        <Button
                                            type="default"
                                            shape="circle"
                                            disabled={activeIndex === 0}
                                            className={`custom-swiper-button-prev !absolute !top-1/2 !left-3 -translate-y-1/2 z-10 !w-11 !h-11 !border !text-base transition-all duration-300 flex items-center justify-center !p-0 ${activeIndex === 0 ? "!bg-gray-100 !border-[#E5E5E5] !text-gray-400 cursor-not-allowed"
                                                : "bg-white !border-[#EBEBEE] !text-black hover:!bg-black hover:!text-white hover:!border-none"
                                                }`}>
                                            <div className="flex items-center justify-center w-full h-full">
                                                <FiChevronLeft size={20} />
                                            </div>
                                        </Button>

                                        <Button
                                            type="default"
                                            shape="circle"
                                            disabled={activeIndex === productImages.length - 1}
                                            className={`custom-swiper-button-next !absolute !top-1/2 !right-3 -translate-y-1/2 z-10 !w-11 !h-11 !border !text-base transition-all duration-300 flex items-center justify-center !p-0 ${activeIndex === productImages.length - 1 ? "!bg-gray-100 !border-[#E5E5E5] !text-gray-400 cursor-not-allowed"
                                                : "bg-white !border-[#EBEBEE] !text-black hover:!bg-black hover:!text-white hover:!border-none"
                                                }`}>
                                            <div className="flex items-center justify-center w-full h-full">
                                                <FiChevronRight size={20} />
                                            </div>
                                        </Button>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-12 md:col-span-6">
                            <div className="flex flex-col gap-y-6">
                                <div className="flex flex-col gap-3 border-b last:border-b-0 border-[#ebebeb] pb-8">
                                    <span className="text-[#545454] text-sm font-medium uppercase">{product.category}</span>
                                    <h2 className="text-3xl text-black font-medium">{product.title}</h2>
                                    <div className="flex items-center gap-3">
                                        <p className="text-[#ff6f61] text-3xl font-medium">$60.00</p>
                                        <p className="text-[#0009] text-3xl font-medium">
                                            <del>$80.00</del>
                                        </p>
                                        <span className="bg-[#ff6f61] text-sm font-normal text-white px-2.5 py-[5px] rounded-full">20% Off</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className="text-[#1d770b] bg-[#2ca3151a] rounded-[5px] px-2.5 py-[5px] font-medium">In Stock</span>
                                        <p>30 sold in last 24 hours</p>
                                    </div>
                                </div>

                                <div className="border-b last:border-b-0 border-[#ebebeb] pb-8 flex flex-col gap-y-6">
                                    <div className="flex flex-col gap-y-2">
                                        <p className="text-black font-normal text-base">Colors:
                                            <span className="font-medium ml-1">Grey</span>
                                        </p>
                                        <div className="flex gap-3">
                                            <div className="w-[38px] h-[38px] flex items-center justify-center cursor-pointer border rounded-full border-[#101828] transition-all duration-300 ease-in-out">
                                                <div className="w-8 h-8 rounded-full bg-[#292929] border border-[#dcdcdc]"> </div>
                                            </div>
                                            <div className="w-[38px] h-[38px] flex items-center justify-center cursor-pointer border rounded-full border-transparent transition-all duration-300 ease-in-out">
                                                <div className="w-8 h-8 rounded-full bg-[#bbb355] border border-[#dcdcdc]"> </div>
                                            </div>
                                            <div className="w-[38px] h-[38px] flex items-center justify-center cursor-pointer border rounded-full border-transparent transition-all duration-300 ease-in-out">
                                                <div className="w-8 h-8 rounded-full bg-[#f2f4f7] border border-[#dcdcdc]"> </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col gap-y-2">
                                        <p className="text-black font-normal text-base">Size:
                                            <span className="font-medium ml-1">Small</span>
                                        </p>
                                        <div className="flex gap-3">
                                            <div className="w-12 h-12 rounded-full border border-black text-xl font-medium cursor-pointer transition-all duration-300 ease-in-out uppercase flex items-center justify-center">
                                                s
                                            </div>
                                            <div className="w-12 h-12 rounded-full border border-[#ebebeb] text-xl font-medium cursor-pointer transition-all duration-300 ease-in-out uppercase flex items-center justify-center">
                                                m
                                            </div>
                                            <div className="w-12 h-12 rounded-full border border-[#ebebeb] text-xl font-medium cursor-pointer transition-all duration-300 ease-in-out uppercase flex items-center justify-center">
                                                l
                                            </div>
                                            <div className="w-12 h-12 rounded-full border border-[#ebebeb] text-xl font-medium cursor-pointer transition-all duration-300 ease-in-out uppercase flex items-center justify-center">
                                                xl
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="border-b last:border-b-0 border-[#ebebeb] pb-8">
                                    <div className="flex items-center gap-3 mb-3">
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
                                        <Button type="button" size="large" className="grow !font-medium bg-black text-white rounded-full hover:!bg-[#ff6f61] transition-all duration-300 ease-in-out">Add to cart</Button>
                                    </div>
                                    <Button type="button" size="large" className="w-full !bg-[#ff6f61] !font-medium text-white rounded-full">Buy it now</Button>

                                    <div className="flex items-center flex-wrap gap-6 mt-4">
                                        <Button
                                            type="default"
                                            size="small"
                                            icon={<FiHeart size={14} className="!font-medium" />}
                                            className="!border-none !px-0 text-sm !font-medium !shadow-none !text-black hover:!text-[#ff6f61] transition-all duration-300 ease-in-out"
                                        >
                                            Add to wishlist
                                        </Button>
                                        <Button
                                            type="default"
                                            size="small"
                                            icon={<FiShuffle size={14} className="!font-medium" />}
                                            className="!border-none !px-0 text-sm !font-medium !shadow-none !text-black hover:!text-[#ff6f61] transition-all duration-300 ease-in-out"
                                        >
                                            Add to Compare
                                        </Button>
                                        <Button
                                            type="default"
                                            size="small"
                                            icon={<FiMessageCircle size={14} className="!font-medium" />}
                                            className="!border-none !px-0 text-sm !font-medium !shadow-none !text-black hover:!text-[#ff6f61] transition-all duration-300 ease-in-out"
                                        >
                                            Ask a Question
                                        </Button>
                                        <Button
                                            type="default"
                                            size="small"
                                            icon={<FiShare2 size={14} className="!font-medium" />}
                                            className="!border-none !px-0 text-sm !font-medium !shadow-none !text-black hover:!text-[#ff6f61] transition-all duration-300 ease-in-out"
                                        >
                                            Share
                                        </Button>
                                    </div>

                                    <div className="mt-4 flex flex-col gap-y-3">
                                        <p className="text-black font-normal text-base">SKU:
                                            <span className="font-medium ml-1">AD1FSSE0YR</span>
                                        </p>
                                        <p className="text-black font-normal text-base">Categories:
                                            <span className="font-medium ml-1">Ring, Neckless</span>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <SwiperSectionLayout
                title="People Also Bought"
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
                bgColor="bg-[#ffffff]"
            >
                {isLoader
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard loading />
                        </SwiperSlide>
                    ))
                    : bestSellingProducts.map((product) => (
                        <SwiperSlide key={product._id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
            </SwiperSectionLayout>

            <SwiperSectionLayout
                title="Recently Viewed"
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
                bgColor="bg-[#ffffff]"
            >
                {isLoader
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard loading />
                        </SwiperSlide>
                    ))
                    : bestSellingProducts.map((product) => (
                        <SwiperSlide key={product._id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
            </SwiperSectionLayout>

            <ProductBottomBar />
        </>
    );
};

export default ProductInfo;
