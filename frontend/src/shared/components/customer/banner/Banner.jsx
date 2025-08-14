import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import { motion } from 'framer-motion';
import { Button } from 'antd';

import { FaArrowRight } from 'react-icons/fa6';
import { Link } from "react-router-dom";

const banners = [
  {
    id: 1,
    image: "/assets/images/banner/slider-image-1.jpg",
    heading: "Timeless Elegance",
    buttonText: "New Arrivals",
    buttonLink: "/shop",
  },
  {
    id: 2,
    image: "/assets/images/banner/slider-image-2.jpg",
    heading: "Golden Moments",
    buttonText: "New Arrivals",
    buttonLink: "/trending",
  },
  {
    id: 3,
    image: "/assets/images/banner/slider-image-3.jpg",
    heading: "Simply Stunning",
    buttonText: "New Arrivals",
    buttonLink: "/products",
  },
];

const Banner = () => {
  return (
    <section className="px-4">
      <div className="container mx-auto">
        <div className="w-full relative">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            loop={true}
            pagination={{ clickable: true }}
            className="w-full"
          >
            {banners.map((banner) => (
              <SwiperSlide key={banner.id} className="relative">
                <img
                  src={banner.image}
                  alt={banner.heading}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 left-0 h-full flex flex-col justify-center items-start text-left px-6 w-full max-w-[600px]">
                  <motion.h1
                    className="text-black text-2xl md:text-[80px] leading-[110%] font-normal mb-8"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                  >
                    {banner.heading}
                  </motion.h1>

                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                  >
                    <Link to={banner.buttonLink}>
                      <Button
                        type="primary"
                        size="large"
                        className="!bg-[#866022] !py-[24px] !text-base !px-[38px] !rounded-none !text-white !border border-[#b99f4a] !uppercase transition duration-300 flex items-center gap-2"
                      >
                        {banner.buttonText}
                        <FaArrowRight size={18} />
                      </Button>
                    </Link>
                  </motion.div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default Banner;
