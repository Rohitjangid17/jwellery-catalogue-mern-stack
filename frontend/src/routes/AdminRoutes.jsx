import { Route } from 'react-router-dom';
import AdminLayout from '../shared/components/layout/AdminLayout';
import Dashboard from '../modules/admin/Dashboard';
import Products from '../modules/admin/Products';
import Orders from '../modules/admin/Orders';
import Users from '../modules/admin/Users';

const adminRoutes = (
    <Route element={<AdminLayout />}>
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/orders" element={<Orders />} />
        <Route path="/admin/users" element={<Users />} />
    </Route>
);

export default adminRoutes;
