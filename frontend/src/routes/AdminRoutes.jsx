import { Navigate, Route } from 'react-router-dom';
import AdminLayout from '../shared/components/layout/AdminLayout';
import Dashboard from '../modules/admin/Dashboard';
import Categories from '../modules/admin/catalogue/Categories';
import Products from '../modules/admin/catalogue/Products';
import ContactQueries from '../modules/admin/ContactQueries';
import ProductReview from '../modules/admin/catalogue/ProductReview';

const adminRoutes = (
    <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="catalogue">
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="product-reviews" element={<ProductReview />} />
            <Route path="wishlist" element={<ProductReview />} />
        </Route>

        <Route path="contact-queries" element={<ContactQueries />} />
    </Route>
);

export default adminRoutes;
