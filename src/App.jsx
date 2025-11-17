

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import Navbar from "./components/Navbar";
import Orders from "./pages/Orders";
import CartSidebar from "./components/CartSidebar";

import Footer from "./components/Footer";


import { AuthProvider } from "./context/AuthProvider";
import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistProvider";

import Wishlist from "./pages/Wishlist";

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 flex flex-col">
              <Navbar />
              <CartSidebar />
              <main className="max-w-7xl mx-auto p-4 flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/product/:id" element={<ProductDetails />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/wishlist" element={<Wishlist />} />
                </Routes>
              </main>
              <Footer />
            </div>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}
