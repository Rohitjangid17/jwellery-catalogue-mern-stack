import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

import GiftCard from "./GiftCard";

const Gifts = () => {
    return (
        <section className="py-16 px-4">
            <div className="container mx-auto">
                <Swiper
                    spaceBetween={24}
                    modules={[Autoplay, Pagination]}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            allowTouchMove: true,
                            loop: true,
                            autoplay: {
                                delay: 3000,
                                disableOnInteraction: false,
                            },
                        },
                        575: {
                            slidesPerView: 1,
                            allowTouchMove: true,
                            loop: true,
                            autoplay: {
                                delay: 3000,
                                disableOnInteraction: false,
                            },
                        },
                        992: {
                            slidesPerView: 2,
                            allowTouchMove: false,
                            loop: false,
                            autoplay: false,
                        },
                    }}
                >
                    <SwiperSlide>
                        <GiftCard />
                    </SwiperSlide>
                    <SwiperSlide>
                        <GiftCard />
                    </SwiperSlide>
                </Swiper>
            </div>
        </section>
    );
};

export default Gifts;