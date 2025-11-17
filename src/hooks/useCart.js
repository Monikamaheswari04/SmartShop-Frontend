
import { useContext } from "react";
import { CartContext } from "../context/CartContextBase"; // points to your context

export const useCart = () => useContext(CartContext);
