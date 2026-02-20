import { Route } from "react-router-dom";
import PublicRoute from "./PublicRoute";

import AuthLayout from "../shared/components/layout/AuthLayout";
import Login from "../modules/auth/Login";

const AuthRoutes = (
    <Route
        path="/auth"
        element={
            <PublicRoute>
                <AuthLayout />
            </PublicRoute>
        }
    >
        <Route path="login" element={<Login />} />
    </Route>
);

export default AuthRoutes;