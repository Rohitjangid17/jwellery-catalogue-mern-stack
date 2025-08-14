import { useRef, useEffect, useState } from 'react';
import { Swiper } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Pagination, Navigation } from 'swiper/modules';
import { IoChevronBack, IoChevronForward } from 'react-icons/io5';

const SwiperSectionLayout = ({ title, children, breakpoints = {}, spaceBetween = 30, bgColor = "#fff" }) => {
    const paginationRef = useRef(null);
    const prevRef = useRef(null);
    const nextRef = useRef(null);
    const [swiper, setSwiper] = useState(null);
    const [isBeginning, setIsBeginning] = useState(true);
    const [isEnd, setIsEnd] = useState(false);

    useEffect(() => {
        if (!swiper || !paginationRef.current || !prevRef.current || !nextRef.current) return;

        swiper.params.navigation.prevEl = prevRef.current;
        swiper.params.navigation.nextEl = nextRef.current;
        swiper.params.pagination.el = paginationRef.current;

        swiper.navigation.init();
        swiper.navigation.update();
        swiper.pagination.init();
        swiper.pagination.render();
        swiper.pagination.update();

        swiper.on('slideChange', () => {
            setIsBeginning(swiper.isBeginning);
            setIsEnd(swiper.isEnd);
        });
    }, [swiper]);

    return (
        <section className={`py-16 px-4 ${bgColor}`}>
            <div className="container mx-auto">
                <div className="flex items-center justify-between mb-12">
                    <h2 className="text-5xl leading-[60px] font-normal">{title}</h2>
                    <div className="flex items-center gap-4">
                        <button ref={prevRef} disabled={isBeginning} className={`text-xl text-black hover:text-[#ff6f61] transition-opacity ${isBeginning ? 'opacity-30 cursor-not-allowed' : ''}`}>
                            <IoChevronBack />
                        </button>
                        <button ref={nextRef} disabled={isEnd} className={`text-xl text-black hover:text-[#ff6f61] transition-opacity ${isEnd ? 'opacity-30 cursor-not-allowed' : ''}`}>
                            <IoChevronForward />
                        </button>
                    </div>
                </div>

                <Swiper
                    spaceBetween={spaceBetween}
                    slidesPerView={1}
                    onSwiper={setSwiper}
                    modules={[Pagination, Navigation]}
                    breakpoints={breakpoints}>
                    {children}
                </Swiper>

                <div ref={paginationRef} className="flex justify-center mt-6 gap-2" />
            </div>
        </section>
    );
};

export default SwiperSectionLayout;
