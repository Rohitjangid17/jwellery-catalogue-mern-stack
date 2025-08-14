import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/thumbs";

const product = {
    title: "Elegant Gold Necklace",
    price: 5499,
    description:
        "This handcrafted gold-plated necklace features a traditional design perfect for festive occasions and gifting.",
    rating: 4.5,
    stock: true,
};

const productImages = [
    "http://localhost:5000/uploads/products/il_794xN.1863509152_n1p0-1753697140406.webp",
    "http://localhost:5000/uploads/products/il_794xN.1863509152_n1p0-1753697140406.webp",
    "http://localhost:5000/uploads/products/il_794xN.1863509152_n1p0-1753697140406.webp",
    "http://localhost:5000/uploads/products/il_794xN.1863509152_n1p0-1753697140406.webp",
    "http://localhost:5000/uploads/products/il_794xN.1863509152_n1p0-1753697140406.webp",
];

const ProductInfo = () => {
    const [thumbsSwiper, setThumbsSwiper] = useState(null);
    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 gap-14">
                    {/* Left Side */}
                    <div className="grid grid-cols-4 gap-7">
                        {/* Thumbnail List */}
                        <div className="flex flex-col gap-2 col-span-1">
                            {productImages.map((src, index) => (
                                <img key={index} src={src} alt={`Thumbnail ${index + 1}`} onClick={() => thumbsSwiper?.slideTo(index)} className={`w-full h-20 object-contain cursor-pointer border rounded-lg ${activeIndex === index
                                    ? "border-[#ff6f61]" : "border-gray-300"}`} />
                            ))}
                        </div>

                        {/* Swiper Carousel */}
                        <div className="col-span-3 relative">
                            <Swiper spaceBetween={10} slidesPerView={1} navigation={true} onSwiper={setThumbsSwiper} onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                                modules={[Navigation, Thumbs]}>
                                {productImages.map((src, index) => (
                                    <SwiperSlide key={index}>
                                        <img src={src} alt={`Product Image ${index + 1}`} className="w-full h-[400px] object-contain rounded" />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>

                    {/* Right Side */}
                    <div className="space-y-4">
                        <h2 className="text-3xl text-black font-medium">{product.title}</h2>
                        <p className="text-xl text-green-600 font-semibold">₹{product.price}</p>

                        <div className="flex items-center gap-2 text-yellow-500">
                            {"★".repeat(Math.floor(product.rating))}
                            {"☆".repeat(5 - Math.floor(product.rating))}
                            <span className="text-gray-600 text-sm">({product.rating})</span>
                        </div>

                        <p className="text-gray-700">{product.description}</p>

                        <p className={`font-medium ${product.stock ? "text-green-600" : "text-red-600"}`}>
                            {product.stock ? "In Stock" : "Out of Stock"}
                        </p>

                        <div className="flex gap-4 mt-4">
                            <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                                Add to Cart
                            </button>
                            <button className="px-6 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg">
                                Buy Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ProductInfo;
