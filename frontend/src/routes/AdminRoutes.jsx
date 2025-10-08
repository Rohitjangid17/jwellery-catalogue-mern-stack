import { Navigate, Route } from 'react-router-dom';
import AdminLayout from '../shared/components/layout/AdminLayout';
import Dashboard from '../modules/admin/Dashboard';
import Products from '../modules/admin/Products';
import Settings from '../modules/admin/Settings';
import ContactQueries from '../modules/admin/ContactQueries';
import Categories from '../modules/admin/Categories';
import GeneralSettings from '../modules/admin/settings/GeneralSettings';
import WhatsAppSettings from '../modules/admin/settings/WhatsAppSettings';
import SocialMediaSettings from '../modules/admin/settings/SocialMediaSettings';

const adminRoutes = (
    <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="categories" element={<Categories />} />
        <Route path="settings" element={<Settings />} />
        <Route path="contact-queries" element={<ContactQueries />} />
        <Route path="settings" element={<Settings />}>
            <Route index element={<Navigate to="general" replace />} />
            <Route path="general" element={<GeneralSettings />} />
            <Route path="whatsapp" element={<WhatsAppSettings />} />
            <Route path="social-media" element={<SocialMediaSettings />} />
        </Route>
    </Route>
);

export default adminRoutes;
