import { Navigate, Route } from 'react-router-dom';
import AuthLayout from '../shared/components/layout/AuthLayout';
import Login from '../modules/auth/Login';

const authRoutes = (
    <Route path="/auth" element={<AuthLayout />}>
        <Route index element={<Navigate to="/auth/login" replace />} />
        <Route path="login" element={<Login />} />
    </Route>
);

export default authRoutes;
