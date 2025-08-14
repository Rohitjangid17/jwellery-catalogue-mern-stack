import BenifitCard from "./BenifitCard"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css";
import 'swiper/css/pagination';

import { HiOutlineTruck } from "react-icons/hi"
import { LuUndo2 } from "react-icons/lu"
import { MdOutlineSupportAgent } from "react-icons/md"
import { Autoplay, Pagination } from "swiper/modules";

const benefits = [
    { id: 1, icon: <HiOutlineTruck size={65} className="text-black" />, title: "Free Shipping", description: "Enjoy free shipping on all orders" },
    { id: 2, icon: <LuUndo2 size={65} className="text-black" />, title: "Free Returns", description: "Within 14 days for a return" },
    { id: 3, icon: <MdOutlineSupportAgent size={65} className="text-black" />, title: "Support Online", description: "Outstanding premium support" },
];

const Benefits = () => {
    return (
        <section className="py-8 px-4">
            <div className="container mx-auto">
                <Swiper
                    spaceBetween={20}
                    modules={[Autoplay, Pagination]}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            allowTouchMove: true,
                            loop: true,
                            autoplay: { delay: 3000, disableOnInteraction: false },
                        },
                        575: {
                            slidesPerView: 2,
                            allowTouchMove: true,
                            loop: true,
                            autoplay: { delay: 3000, disableOnInteraction: false },
                        },
                        992: {
                            slidesPerView: benefits.length,
                            allowTouchMove: false,
                            loop: false,
                            autoplay: false,
                        },
                    }}>
                    {benefits.map(benifit => (
                        <SwiperSlide key={benifit.id}>
                            <BenifitCard icon={benifit.icon} title={benifit.title} description={benifit.description} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default Benefits
