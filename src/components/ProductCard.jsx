import { Link } from "react-router-dom";
import { useCart } from "../hooks/useCart";
import { useWishlist } from "../hooks/useWishlist";
import { useAuth } from "../hooks/useAuth";
import { motion as Motion } from "framer-motion";

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const { user } = useAuth();

  const isWishlisted = wishlist.find(p => p.id === product.id);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login first to add items to cart");
      return;
    }
    addToCart(product);
  };

  const handleWishlist = () => {
    if (!user) {
      alert("Please login first to add items to wishlist");
      return;
    }
    toggleWishlist(product);

    if (!isWishlisted) {
      const el = document.createElement("div");
      el.innerText = "Added to Wishlist ♥";
      el.className = "fixed top-20 right-4 sm:right-10 bg-pink-500 text-white px-3 py-1 rounded shadow-lg z-50 animate-bounce text-sm sm:text-base";
      document.body.appendChild(el);
      setTimeout(() => document.body.removeChild(el), 1200);
    }
  };

  return (
    <Motion.article
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-3 sm:p-4 flex flex-col transition-colors duration-300"
    >
      <div className="relative">
        <Link to={`/product/${product.id}`} className="overflow-hidden rounded">
          <img
            src={product.image}
            alt={product.name}
            className="h-36 sm:h-44 w-full object-cover rounded transition-transform duration-300 hover:scale-105"
          />
        </Link>
        <button
          onClick={handleWishlist}
          className={`absolute top-2 right-2 p-1 sm:p-2 rounded-full transition-colors duration-300 text-xs sm:text-base ${
            isWishlisted
              ? "bg-red-500 text-white hover:bg-red-600"
              : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600"
          }`}
        >
          ♥
        </button>
      </div>

      <div className="mt-2 sm:mt-3 flex-1">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-sm sm:text-base text-gray-900 dark:text-gray-100">{product.name}</h3>
        </Link>
        <div className="mt-1 sm:mt-2 flex items-center justify-between text-xs sm:text-sm">
          <div className="text-gray-500 dark:text-gray-400">{product.category}</div>
          <div className="font-bold text-gray-900 dark:text-gray-100">₹{product.price.toFixed(2)}</div>
        </div>
      </div>

      <div className="mt-2 sm:mt-3">
        <button
          onClick={handleAddToCart}
          className="w-full px-2 sm:px-3 py-2 rounded bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white text-sm sm:text-base transition-colors duration-300"
        >
          Add to cart
        </button>
      </div>
    </Motion.article>
  );
}
