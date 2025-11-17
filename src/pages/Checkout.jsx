import { useCart } from "../context/useCart";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import confetti from "canvas-confetti";

export default function Checkout() {
  const { cartItems, clearCart } = useCart();
  const [orderPlaced, setOrderPlaced] = useState(false);
  const navigate = useNavigate();

  const total = cartItems.reduce((s, i) => s + i.price * i.quantity, 0);

  const handlePlaceOrder = () => {
    if (cartItems.length === 0) return;

    confetti({ particleCount: 200, spread: 90, origin: { y: 0.6 } });

    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = { id: new Date().getTime(), items: cartItems, total };
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    clearCart();
    setOrderPlaced(true);
  };

  const handleViewOrders = () => navigate("/orders");
  const handleGoHome = () => navigate("/");

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-6">
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-center sm:text-left">Checkout</h2>

      {!orderPlaced ? (
        <>
          {cartItems.length === 0 && <div className="text-gray-500 mb-4 text-center">Your cart is empty.</div>}

          <div className="space-y-4">
            {cartItems.map(item => (
              <div
                key={item.id}
                className="flex flex-col sm:flex-row items-center sm:items-start gap-4 border-b pb-2"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 sm:w-24 sm:h-24 object-cover rounded"
                />
                <div className="flex-1 text-center sm:text-left">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                  <div className="text-sm sm:text-base font-bold">
                    ₹{(item.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-col sm:flex-row justify-between font-bold text-lg gap-2 sm:gap-0">
            <div>Total:</div>
            <div>₹{total.toFixed(2)}</div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full sm:w-auto sm:px-8 bg-green-600 text-white py-2 rounded text-lg"
          >
            Place Order
          </button>
        </>
      ) : (
        <div className="mt-6 text-center">
          <div className="text-2xl sm:text-3xl font-bold mb-4">🎉 Order Placed Successfully! 🎉</div>
          <p className="text-gray-600 mb-6">Thank you for your purchase!</p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleViewOrders}
              className="px-4 py-2 w-full sm:w-auto bg-blue-600 text-white rounded"
            >
              View Orders
            </button>
            <button
              onClick={handleGoHome}
              className="px-4 py-2 w-full sm:w-auto bg-gray-300 text-gray-900 rounded"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
