import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useEffect, useState } from "react";
import { categoryService } from "../../../../services/categoryService";
import CategoryCard from "./CategoryCard";
import "react-loading-skeleton/dist/skeleton.css";

const Categories = () => {
    const [categories, setCategories] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getCategoryList();

        // const timer = setTimeout(() => getCategoryList(), 2000);
        // return () => clearTimeout(timer);
    }, []);

    // Fetch category list
    const getCategoryList = async () => {
        setIsLoading(true);
        try {
            const response = await categoryService.getCategories();
            setCategories(response.categories);
            console.log("response category ", response);
        } catch (error) {
            console.error("Error fetching categories:", error);
            setCategories([]);
        } finally {
            setIsLoading(false);
        }
    };

    if (!isLoading && categories.length === 0) {
        return null;
    }

    return (
        <>
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
                        {isLoading
                            ?
                            Array.from({ length: 4 }).map((_, index) => (
                                <SwiperSlide key={index}>
                                    <CategoryCard loading />
                                </SwiperSlide>
                            ))
                            :
                            categories.map((category) => (
                                <SwiperSlide key={category._id}>
                                    <CategoryCard category={category} />
                                </SwiperSlide>
                            ))}
                    </Swiper>
                </div>
            </section>
        </>
    );
};

export default Categories;
