import { useWishlist } from "../hooks/useWishlist";
import { useCart } from "../hooks/useCart";
import { useAuth } from "../hooks/useAuth";
import { Link } from "react-router-dom";

export default function Wishlist() {
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCart();
  const { user } = useAuth();

  const handleAddToCart = (product) => {
    if (!user) return alert("Please login to add items to cart");
    addToCart(product);
  };

  const handleRemoveWishlist = (product) => {
    if (!user) return alert("Please login to remove wishlist items");
    toggleWishlist(product);
  };

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto p-4 text-center text-gray-700 dark:text-gray-300">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-2">Your Wishlist is Empty</h2>
        <Link
          to="/"
          className="inline-block mt-2 px-4 py-2 sm:px-6 sm:py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
      {wishlist.map((product) => (
        <div
          key={product.id}
          className="flex flex-col bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg shadow-md transition hover:scale-105"
        >
          <Link to={`/product/${product.id}`}>
            <img
              src={product.image}
              alt={product.name}
              className="h-40 sm:h-48 w-full object-cover rounded mb-2 sm:mb-3"
            />
          </Link>
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base mb-1">
              {product.name}
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-2">
              ₹{product.price.toFixed(2)}
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <button
              onClick={() => handleAddToCart(product)}
              className="flex-1 px-3 py-2 sm:px-4 sm:py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => handleRemoveWishlist(product)}
              className="flex-1 px-3 py-2 sm:px-4 sm:py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
