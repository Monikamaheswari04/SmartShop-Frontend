
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

    // Celebration animation
    confetti({
      particleCount: 200,
      spread: 90,
      origin: { y: 0.6 },
    });

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem("orders") || "[]");
    const newOrder = { id: new Date().getTime(), items: cartItems, total };
    localStorage.setItem("orders", JSON.stringify([...existingOrders, newOrder]));

    clearCart();
    setOrderPlaced(true);
  };

  const handleViewOrders = () => navigate("/orders"); // redirect to orders page
  const handleGoHome = () => navigate("/"); // redirect to home page

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>

      {!orderPlaced ? (
        <>
          {cartItems.length === 0 && <div className="text-gray-500 mb-4">Your cart is empty.</div>}

          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 border-b pb-2">
                <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
                <div className="flex-1">
                  <div className="font-semibold">{item.name}</div>
                  <div className="text-sm text-gray-500">Quantity: {item.quantity}</div>
                  <div className="text-sm font-bold">₹{(item.price * item.quantity).toFixed(2)}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex justify-between font-bold text-lg">
            <div>Total:</div>
            <div>₹{total.toFixed(2)}</div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="mt-6 w-full bg-green-600 text-white py-2 rounded text-lg"
          >
            Place Order
          </button>
        </>
      ) : (
        <div className="mt-6 text-center">
          <div className="text-2xl font-bold mb-4">🎉 Order Placed Successfully! 🎉</div>
          <p className="text-gray-600 mb-6">Thank you for your purchase!</p>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleViewOrders}
              className="px-4 py-2 bg-blue-600 text-white rounded"
            >
              View Orders
            </button>
            <button
              onClick={handleGoHome}
              className="px-4 py-2 bg-gray-300 text-gray-900 rounded"
            >
              Go to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
