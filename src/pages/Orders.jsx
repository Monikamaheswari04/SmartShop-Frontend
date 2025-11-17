import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();

  // Initialize orders directly from localStorage
  const [orders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders") || "[]");
  });

  return (
    <div className="max-w-4xl mx-auto p-4 sm:px-6 lg:px-8">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 border rounded bg-gray-50 dark:bg-gray-800"
            >
              <div className="mb-2 font-semibold text-sm sm:text-base">
                Order ID: {order.id}
              </div>
              <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                {order.items.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col items-center w-20 sm:w-24"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded"
                    />
                    <div className="text-xs sm:text-sm text-center truncate">
                      {item.name}
                    </div>
                    <div className="text-xs sm:text-sm font-bold">
                      x{item.quantity}
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-2 font-bold text-right text-sm sm:text-base">
                Total: ₹{order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-300 text-gray-900 rounded w-full sm:w-auto"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
