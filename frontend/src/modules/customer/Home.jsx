import Banner from "../../shared/components/customer/banner/Banner";
import Benefits from "../../shared/components/customer/benefit/Benefits";
import Brands from "../../shared/components/customer/brand/Brands";
import Categories from "../../shared/components/customer/category/Categories";
import Gifts from "../../shared/components/customer/gift/Gifts";
import Look from "../../shared/components/customer/look/Look";
import BestSellers from "../../shared/components/customer/product/BestSellers";
import Testimonials from "../../shared/components/customer/testimonial/testimonials";

const Home = () => {
    return (
        <>
            <Banner />
            <Benefits />
            <BestSellers />
            <Categories />
            <Gifts />
            <Look />
            <Testimonials />
            <Brands />
        </>
    )
}

export default Home;