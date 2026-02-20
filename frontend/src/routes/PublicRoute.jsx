import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
    const token = localStorage.getItem("admin_token");
    const user = JSON.parse(localStorage.getItem("admin_user") || "{}");

    if (token && user?.role === "admin") {
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;