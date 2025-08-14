import SwiperSectionLayout from '../swiper/SwiperSectionLayout';
import TestimonialCard from './TestimonialCard';
import { SwiperSlide } from 'swiper/react';

const Testimonials = () => {
    return (
        <SwiperSectionLayout
            title="Customer Reviews"
            breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 3 },
            }}
            bgColor="bg-[#eee7da]">
            {[...Array(4)].map((_, idx) => (
                <SwiperSlide key={idx}>
                    <TestimonialCard />
                </SwiperSlide>
            ))}
        </SwiperSectionLayout>
    );
};

export default Testimonials;
