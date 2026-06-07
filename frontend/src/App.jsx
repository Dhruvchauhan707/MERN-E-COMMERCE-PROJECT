import {
  Routes,
  Route,
  Outlet,
} from "react-router-dom";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/user/Navbar";
import HomePage from "./pages/user/Home";
import CartPage from "./pages/user/CartPage";
import RegisterPage from "./pages/user/RegisterPage";
import LoginPage from "./pages/user/LoginPage";
import Shop from "./pages/user/Shop";
import AboutUs from "./pages/user/AboutUs";
import CategoryPage from "./pages/user/CategoryPage";
import WishlistPage from "./pages/user/WishlistPage";
import ProfilePage from "./pages/user/ProfilePage";
import ProductDetail from "./pages/user/ProductDetail";
import CheckoutPage from "./pages/user/CheckoutPage";
import AdminHome from "./pages/admin/AdminHome";
import UserLayout from "./layouts/UserLayout";
import AdminLayout from "./layouts/AdminLayout";
import ChangePassword from "./pages/user/ChangePassword";
import ImageSearchPage from "./pages/user/ImageSearch";

import ProtectedRoute from "./components/user/ProtectedRoute";

function App() {

  return (
    <>
      <Routes>
        {/* ==================== USER ROUTES ==================== */}
        <Route element={<UserLayout />}>
          {/* Public Routes - bina login ke khulenge */}
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/categories" element={<CategoryPage />} />
          <Route path="/image-search" element={<ImageSearchPage />}  />

          {/* Auth Routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />

          {/* Protected Routes - Login chahiye */}
          <Route element={<ProtectedRoute />}>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/wishlist" element={<WishlistPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Route>
        </Route>

        {/* ==================== ADMIN ROUTES ==================== */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/home" element={<AdminHome />} />
          {/* aur admin routes yaha add kar sakte ho */}
        </Route>
      </Routes>

      <ToastContainer />
    </>
  );
}

export default App;