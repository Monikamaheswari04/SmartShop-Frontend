

import { useState } from "react";
import { CartContext } from "./CartContextBase";

export function CartProvider({ children }) {
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  const toggleCart = () => setCartOpen(prev => !prev);

  const addToCart = (product, qty = 1) => {
    setCartItems(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p =>
          p.id === product.id ? { ...p, quantity: p.quantity + qty } : p
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
  };

  const updateQty = (id, qty) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: Math.max(1, qty) } : item
      )
    );
  };

  const removeFromCart = id => setCartItems(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartOpen, toggleCart, cartItems, addToCart, updateQty, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}
