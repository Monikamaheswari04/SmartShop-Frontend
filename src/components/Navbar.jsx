

import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useAuth } from "../hooks/useAuth";
import { useWishlist } from "../hooks/useWishlist";

export default function Navbar() {
  const { toggleCart, cartItems } = useCart();
  const { wishlist } = useWishlist(); 
  const { user, login, signup, logout } = useAuth();

  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const [dark, setDark] = useState(() => localStorage.getItem("ui_dark") === "1");

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("ui_dark", dark ? "1" : "0");
  }, [dark]);

  function onSearch(e) {
    e.preventDefault();
    const q = query.trim();
    navigate(`/?q=${encodeURIComponent(q)}`);
    if (location.pathname !== "/") navigate("/");
  }

  const handleAuth = (e) => {
    e.preventDefault();
    if (isSignup) signup(formEmail, formPassword);
    else login(formEmail, formPassword);
    setShowModal(false);
    setFormEmail("");
    setFormPassword("");
  };

  return (
    <header className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 sticky top-0 z-40">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 p-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10">
            <span className="absolute w-full h-full rounded-full bg-blue-500 animate-ping opacity-30"></span>
            <span className="absolute w-full h-full rounded-full bg-blue-600 transform rotate-45 group-hover:rotate-0 transition-transform duration-500"></span>
            <svg
              className="relative w-10 h-10 text-white"
              viewBox="0 0 64 64"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 18H20L24 44H48L52 26H22"
                stroke="currentColor"
                strokeWidth="4"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="28" cy="50" r="4" fill="currentColor" />
              <circle cx="44" cy="50" r="4" fill="currentColor" />
            </svg>
          </div>
          <div className="text-2xl font-extrabold text-gray-900 dark:text-gray-100 transition-colors duration-300">
            ProU Store
          </div>
        </Link>

        {/* Desktop Search */}
        <form onSubmit={onSearch} className="flex-1 px-4 hidden md:flex">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products..."
            className="w-full p-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
          />
          <button type="submit" className="ml-2 px-4 rounded bg-blue-600 text-white">
            Search
          </button>
        </form>

        {/* Right buttons */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setDark((d) => !d)}
            className="px-3 py-2 border rounded dark:text-white transition hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {dark ? "Light" : "Dark"}
          </button>

          {/* Wishlist */}
          <button
            onClick={() => navigate("/wishlist")}
            className="relative px-3 py-2 rounded border dark:text-white transition transform hover:scale-105"
          >
            Wishlist
            {wishlist.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                {wishlist.length}
              </span>
            )}
          </button>

          {/* Cart */}
          <button
            onClick={() => {
              if (!user) setShowModal(true);
              else toggleCart();
            }}
            className="relative px-3 py-2 rounded border dark:text-white transition transform hover:scale-105"
          >
            Cart
            {cartItems.length > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full px-2 text-xs">
                {cartItems.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </button>

          {user ? (
            <button
              onClick={logout}
              className="px-3 py-2 border rounded dark:text-white transition hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => setShowModal(true)}
              className="px-3 py-2 border rounded dark:text-white transition hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Login / Signup
            </button>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden px-4 pb-3">
        <form onSubmit={onSearch} className="flex gap-2">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search..."
            className="flex-1 p-2 rounded-md border dark:bg-gray-700 dark:border-gray-600"
          />
          <button className="px-3 py-2 rounded bg-blue-600 text-white">Go</button>
        </form>
      </div>

      {/* Auth Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded shadow-lg w-80 relative">
            <h2 className="text-xl font-bold mb-4">{isSignup ? "Signup" : "Login"}</h2>
            <form onSubmit={handleAuth} className="flex flex-col gap-3">
              <input
                type="email"
                placeholder="Email"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <input
                type="password"
                placeholder="Password"
                value={formPassword}
                onChange={(e) => setFormPassword(e.target.value)}
                className="p-2 border rounded dark:bg-gray-700 dark:border-gray-600"
                required
              />
              <button
                type="submit"
                className="px-4 py-2 rounded bg-blue-600 text-white"
              >
                {isSignup ? "Signup" : "Login"}
              </button>
            </form>
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-300">
              {isSignup ? (
                <>
                  Already have an account?{" "}
                  <button
                    onClick={() => setIsSignup(false)}
                    className="underline text-blue-500"
                  >
                    Login
                  </button>
                </>
              ) : (
                <>
                  Don't have an account?{" "}
                  <button
                    onClick={() => setIsSignup(true)}
                    className="underline text-blue-500"
                  >
                    Signup
                  </button>
                </>
              )}
            </div>
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-500 dark:text-gray-300"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
