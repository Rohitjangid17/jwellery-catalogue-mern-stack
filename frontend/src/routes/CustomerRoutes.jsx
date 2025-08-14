import { Navigate, Route } from 'react-router-dom';
import CustomerLayout from '../shared/components/layout/CustomerLayout';
import Products from '../modules/customer/products/Products';
import Home from '../modules/customer/Home';
import About from '../modules/customer/About';
import Shop from '../modules/customer/Shop';
import ProductDetails from '../modules/customer/products/ProductDetails';
import ContactUs from '../modules/customer/ContactUs';
import PrivacyPolicy from '../modules/customer/PrivacyPolicy';
import TermCondition from '../modules/customer/TermCondition';
import ReturnRefund from '../modules/customer/ReturnRefund';
import Shipping from '../modules/customer/Shipping';
import Faq from '../modules/customer/Faq.JSX';

const customerRoutes = (
    <Route element={<CustomerLayout />}>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/term-and-condition" element={<TermCondition />} />
        <Route path="/return-and-refund" element={<ReturnRefund />} />
        <Route path="/shipping" element={<Shipping />} />
        <Route path="/faq" element={<Faq />} />
    </Route>
);

export default customerRoutes;
