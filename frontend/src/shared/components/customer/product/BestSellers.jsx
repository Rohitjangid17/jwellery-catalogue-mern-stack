import { SwiperSlide } from 'swiper/react';
import SwiperSectionLayout from '../swiper/SwiperSectionLayout';
import ProductCard from './ProductCard';

const BestSellers = () => {
    return (
        <SwiperSectionLayout
            title="Best Sellers"
            breakpoints={{
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 4 },
            }}
            bgColor="bg-[#ffffff]">
            {[...Array(6)].map((_, idx) => (
                <SwiperSlide key={idx}>
                    <ProductCard />
                </SwiperSlide>
            ))}
        </SwiperSectionLayout>
    );
};

export default BestSellers;
