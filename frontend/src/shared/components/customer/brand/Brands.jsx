import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { useEffect, useState } from "react";
import BrandCard from "./BrandCard";

const brands = [1, 2, 3, 4, 5, 6];

const Brands = () => {
    const [swiperKey, setSwiperKey] = useState(0);

    // Re-create swiper when window is resized
    useEffect(() => {
        const handleResize = () => {
            setSwiperKey(prev => prev + 1);
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return (
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto">
                <h2 className="text-5xl text-center font-normal mb-12">Follow @Vineta</h2>

                <Swiper
                    key={swiperKey}
                    modules={[Autoplay, Pagination]}
                    spaceBetween={20}
                    allowTouchMove={true}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            loop: true,
                            autoplay: {
                                delay: 2500,
                                disableOnInteraction: false,
                            },
                            pagination: { clickable: true },
                        },
                        576: {
                            slidesPerView: 2,
                            loop: true,
                            autoplay: {
                                delay: 2500,
                                disableOnInteraction: false,
                            },
                            pagination: { clickable: true },
                        },
                        992: {
                            slidesPerView: 4,
                            loop: false,
                            autoplay: false,
                            pagination: false,
                        },
                    }}
                >
                    {brands.map((_, idx) => (
                        <SwiperSlide key={idx}>
                            <BrandCard />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Brands;
