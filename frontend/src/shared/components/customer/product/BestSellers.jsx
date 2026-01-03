import { SwiperSlide } from 'swiper/react';
import SwiperSectionLayout from '../swiper/SwiperSectionLayout';
import ProductCard from './ProductCard';
import { productService } from '../../../../services/productService';
import { useEffect, useState } from 'react';

const BestSellers = () => {
    const [bestSellingProducts, setBestSellingProducts] = useState([]);
    const [isLoader, setIsLoader] = useState(true);

    useEffect(() => {
        getBestSellingProducts();
        // const timer = setTimeout(() => getBestSellingProducts(), 2000);
        // return () => clearTimeout(timer);
    }, []);


    // get best selling product
    const getBestSellingProducts = async () => {
        setIsLoader(true);
        try {
            const response = await productService.getAllProducts();
            console.log("Best Selling Products:", response.products);

            if (response && Array.isArray(response.products)) {
                setBestSellingProducts(response.products);
            } else {
                setBestSellingProducts([]);
            }
        } catch (error) {
            console.error("Error fetching best selling products:", error);
            setBestSellingProducts([]);
        } finally {
            setIsLoader(false);
        }
    };

    if (!isLoader && bestSellingProducts.length === 0) {
        return null;
    }

    return (
        <>
            <SwiperSectionLayout
                title="Best Sellers"
                breakpoints={{
                    768: { slidesPerView: 2 },
                    1024: { slidesPerView: 4 },
                }}
                bgColor="bg-[#ffffff]"
            >
                {isLoader
                    ? Array.from({ length: 4 }).map((_, index) => (
                        <SwiperSlide key={index}>
                            <ProductCard loading />
                        </SwiperSlide>
                    ))
                    : bestSellingProducts.map((product) => (
                        <SwiperSlide key={product._id}>
                            <ProductCard product={product} />
                        </SwiperSlide>
                    ))}
            </SwiperSectionLayout>
        </>
    );
};

export default BestSellers;
