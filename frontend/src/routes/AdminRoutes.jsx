import { Navigate, Route } from 'react-router-dom';
import AdminLayout from '../shared/components/layout/AdminLayout';
import Dashboard from '../modules/admin/Dashboard';
import Categories from '../modules/admin/catalogue/Categories';
import Products from '../modules/admin/catalogue/products/Products';
import ContactQueries from '../modules/admin/ContactQueries';
import ProductReview from '../modules/admin/catalogue/ProductReview';
import Wishlist from '../modules/admin/catalogue/Wishlist';
import GeneralSettings from '../modules/admin/settings/GeneralSettings';
import WhatsAppSettings from '../modules/admin/settings/WhatsAppSettings';
import SocialMediaSettings from '../modules/admin/settings/SocialMediaSettings';

const adminRoutes = (
    <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="catalogue">
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="product-reviews" element={<ProductReview />} />
            <Route path="wishlist" element={<Wishlist />} />
        </Route>

        <Route path="contact-queries" element={<ContactQueries />} />

        <Route path="settings">
            <Route path="general" element={<GeneralSettings />} />
            <Route path="whatsapp" element={<WhatsAppSettings />} />
            <Route path="social-media" element={<SocialMediaSettings />} />
        </Route>
    </Route>
);

export default adminRoutes;
