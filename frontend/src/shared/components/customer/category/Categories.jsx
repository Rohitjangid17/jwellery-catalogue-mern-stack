import CategoryCard from "./CategoryCard"
import { Swiper, SwiperSlide } from "swiper/react"
import "swiper/css"
import "swiper/css/pagination"
import { Autoplay, Pagination } from "swiper/modules"

const categories = [
    {
        id: 1,
        image: "/assets/images/category/product-5.jpg",
        title: "Necklace",
        count: 12,
    },
    {
        id: 2,
        image: "/assets/images/category/product-5.jpg",
        title: "Rings",
        count: 18,
    },
    {
        id: 3,
        image: "/assets/images/category/product-5.jpg",
        title: "Earrings",
        count: 9,
    },
    {
        id: 4,
        image: "/assets/images/category/product-5.jpg",
        title: "Ring",
        count: 10,
    },
];

const Categories = () => {
    return (
        <section className="py-16 px-4 bg-white">
            <div className="container mx-auto">
                <Swiper
                    spaceBetween={20}
                    modules={[Autoplay, Pagination]}
                    pagination={{ clickable: true }}
                    breakpoints={{
                        0: {
                            slidesPerView: 1,
                            loop: true,
                            autoplay: {
                                delay: 3000,
                                disableOnInteraction: false,
                            },
                        },
                        640: {
                            slidesPerView: 2,
                        },
                        768: {
                            slidesPerView: 3,
                        },
                        1024: {
                            slidesPerView: 4,
                            loop: false,
                            autoplay: false,
                        },
                    }}>
                    {categories.map((category) => (
                        <SwiperSlide key={category.id}>
                            <CategoryCard
                                image={category.image}
                                title={category.title}
                                count={category.count}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    )
}

export default Categories
