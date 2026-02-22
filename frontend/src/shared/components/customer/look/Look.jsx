import LookCard from "./LookCard";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const Look = () => {
    return (
        <section className="py-8 sm:py-12 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
                    <img
                        src="/assets/images/product/banner-lookbook-1.jpg"
                        alt="look"
                        className="w-full h-auto object-cover"
                    />
                    <div className="px-4">
                        <h2 className="mb-8 md:mb-16 text-2xl md:text-4xl font-medium text-black text-center">
                            Shop The Look
                        </h2>

                        <div className="relative max-w-sm mx-auto px-10">
                            <Swiper
                                modules={[Navigation]}
                                navigation={{
                                    nextEl: ".custom-next",
                                    prevEl: ".custom-prev"
                                }}
                                className="rounded-md"
                            >
                                <SwiperSlide>
                                    <LookCard
                                        title="Venice Mini Bracelet"
                                        currentPrice={100}
                                        oldPrice={130}
                                        image="/assets/images/product/bracelet.jpg"
                                    />
                                </SwiperSlide>
                                <SwiperSlide>
                                    <LookCard
                                        title="Gold Hoop Earrings"
                                        currentPrice={89}
                                        oldPrice={110}
                                        image="/assets/images/product/bracelet.jpg"
                                    />
                                </SwiperSlide>
                            </Swiper>

                            {/* Custom Arrows */}
                            <button className="custom-prev absolute -left-5 top-1/2 -translate-y-1/2 z-10 bg-white text-black border border-[#ebebeb] p-2 rounded-full shadow hover:bg-black hover:text-white transition">
                                <FaChevronLeft size={12} />
                            </button>
                            <button className="custom-next absolute -right-5 top-1/2 -translate-y-1/2 z-10 bg-white text-black border border-[#ebebeb] p-2 rounded-full shadow hover:bg-black hover:text-white transition">
                                <FaChevronRight size={12} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Look;
