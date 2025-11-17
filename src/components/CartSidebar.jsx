import { AnimatePresence, motion as Motion } from "framer-motion";
import { useCart } from "../context/useCart";
import { useNavigate } from "react-router-dom";

export default function CartSidebar() {
  const { cartOpen, toggleCart, cartItems, updateQty, removeFromCart, clearCart } = useCart();
  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }
    navigate("/checkout");
  };

  return (
    <AnimatePresence>
      {cartOpen && (
        <Motion.aside
          initial={{ x: 300 }}
          animate={{ x: 0 }}
          exit={{ x: 300 }}
          className="fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-gray-900 shadow-lg z-50 p-4 transition-colors duration-300"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-2 sm:gap-0">
            <h3 className="text-lg font-bold">Your Cart</h3>
            <div className="flex items-center gap-2">
              <button onClick={clearCart} className="px-3 py-1 border rounded text-sm">
                Clear
              </button>
              <button onClick={toggleCart} className="px-3 py-1 border rounded">
                Close
              </button>
            </div>
          </div>

          <div className="space-y-4 overflow-auto h-[calc(100%-160px)]">
            {cartItems.length === 0 && <div className="text-gray-500">Cart is empty</div>}

            {cartItems.map(item => (
              <div key={item.id} className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 sm:w-16 sm:h-16 object-cover rounded"
                />

                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">₹{item.price.toFixed(2)}</div>

                  <div className="mt-2 flex items-center gap-2">
                    <button
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      className="px-2 py-1 border rounded"
                    >
                      -
                    </button>
                    <div className="px-3">{item.quantity}</div>
                    <button
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      className="px-2 py-1 border rounded"
                    >
                      +
                    </button>
                  </div>
                </div>

                <button onClick={() => removeFromCart(item.id)} className="text-red-500 mt-2 sm:mt-0">
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">Subtotal</div>
              <div className="font-bold">₹{total.toFixed(2)}</div>
            </div>

            <div className="mt-3">
              <button
                onClick={handleCheckout}
                className="w-full px-4 py-2 rounded bg-blue-600 text-white"
              >
                Checkout
              </button>
            </div>
          </div>
        </Motion.aside>
      )}
    </AnimatePresence>
  );
}
