
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Orders() {
  const navigate = useNavigate();

  // Initialize orders directly from localStorage
  const [orders] = useState(() => {
    return JSON.parse(localStorage.getItem("orders") || "[]");
  });

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-center">Your Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center text-gray-500">No orders found.</div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => (
            <div key={order.id} className="p-4 border rounded bg-gray-50 dark:bg-gray-800">
              <div className="mb-2 font-semibold">Order ID: {order.id}</div>
              <div className="flex flex-wrap gap-4">
                {order.items.map(item => (
                  <div key={item.id} className="flex flex-col items-center w-24">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded"
                    />
                    <div className="text-sm text-center">{item.name}</div>
                    <div className="text-sm font-bold">x{item.quantity}</div>
                  </div>
                ))}
              </div>
              <div className="mt-2 font-bold text-right">Total: ₹{order.total.toFixed(2)}</div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-300 text-gray-900 rounded"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
}
