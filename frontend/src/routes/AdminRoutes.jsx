import { Navigate, Route } from 'react-router-dom';
import AdminLayout from '../shared/components/layout/AdminLayout';
import Dashboard from '../modules/admin/Dashboard';
import Products from '../modules/admin/Products';
import Settings from '../modules/admin/Settings';
import ContactQueries from '../modules/admin/ContactQueries';
import Categories from '../modules/admin/Categories';

const adminRoutes = (
    <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="settings" element={<Settings />} />
        <Route path="contact-queries" element={<ContactQueries />} />
    </Route>
);

export default adminRoutes;
