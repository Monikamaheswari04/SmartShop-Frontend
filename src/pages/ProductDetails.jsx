import { useParams } from "react-router-dom";
import products from "../data/products.json";
import { useCart } from "../context/useCart";

export default function ProductDetails() {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = products.find((p) => p.id === Number(id));
  if (!product) return <div>Product not found</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg p-4 sm:p-6 shadow transition-colors duration-300">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-60 sm:h-80 object-cover rounded"
      />
      <h1 className="text-xl sm:text-2xl font-bold mt-4 text-gray-900 dark:text-gray-100">
        {product.name}
      </h1>
      <p className="mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
        {product.description}
      </p>
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100">
          ₹{product.price.toFixed(2)}
        </div>
        <button
          onClick={() => addToCart(product)}
          className="px-4 py-2 rounded bg-green-600 hover:bg-green-700 dark:bg-green-500 dark:hover:bg-green-600 text-white transition-colors duration-300 w-full sm:w-auto"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
