import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem("admin_token");
    const user = JSON.parse(localStorage.getItem("admin_user") || "{}");

    if (!token || user?.role !== "admin") {
        return <Navigate to="/auth/login" replace />;
    }

    return children;
};

export default ProtectedRoute;