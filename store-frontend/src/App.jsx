import { Route, Routes } from "react-router-dom";
import "./App.css";

import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";
import Profile from "./pages/Profile";
import Register from "./pages/Register";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Wishlist from "./pages/Wishlist";


import AdminDashboard from "./admin/AdminDashboard";
import AdminOrders from "./admin/AdminOrders";
import AdminProducts from "./admin/AdminProducts";
import AdminProductForm from "./admin/AdminProductForm";
import AdminUsers from "./admin/AdminUsers";
import AdminLayout from "./components/admin/AdminLayout";

import MainLayout from "./components/MainLayout";
import ScrollToTop from "./components/ScrollToTop";
import Collections from "./pages/Collections";

function App() {
  return (
    <>
    <ScrollToTop/>
    <Routes>
      {/* Normal Website */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="products/:id" element={<ProductDetails />} />
        <Route path="products" element={<Products />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="profile" element={<Profile />} />
        <Route path="orders" element={<Orders />} />
        <Route path="wishlist" element={<Wishlist />} />
        <Route path="collections" element={<Collections />} />
      </Route>

      {/* Admin */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />

        <Route path="orders" element={<AdminOrders />} />

        <Route path="products" element={<AdminProducts />} />

        <Route path="products/new" element={<AdminProductForm />} />

        <Route path="products/edit/:id" element={<AdminProductForm />} />

        <Route path="users" element={<AdminUsers />} />
      </Route>
    </Routes>
    </>
  );
}

export default App;