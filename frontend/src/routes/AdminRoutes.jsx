import { Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

import AdminLayout from "../shared/components/layout/AdminLayout";
import Dashboard from "../modules/admin/Dashboard";
import Categories from "../modules/admin/catalogue/Categories";
import Products from "../modules/admin/catalogue/products/Products";
import AddProduct from "../modules/admin/catalogue/products/AddProduct";
import ContactQueries from "../modules/admin/ContactQueries";
import ProductReview from "../modules/admin/catalogue/ProductReview";
import Wishlist from "../modules/admin/catalogue/Wishlist";
import GeneralSettings from "../modules/admin/settings/GeneralSettings";
import WhatsAppSettings from "../modules/admin/settings/WhatsAppSettings";
import SocialMediaSettings from "../modules/admin/settings/SocialMediaSettings";

const AdminRoutes = (
    <Route
        path="/admin"
        element={
            <ProtectedRoute>
                <AdminLayout />
            </ProtectedRoute>
        }
    >
        <Route index element={<Dashboard />} />
        <Route path="dashboard" element={<Dashboard />} />

        <Route path="catalogue">
            <Route path="categories" element={<Categories />} />
            <Route path="products" element={<Products />} />
            <Route path="add-product" element={<AddProduct />} />
            <Route path="update-product/:id" element={<AddProduct />} />
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

export default AdminRoutes;