

import { useContext } from "react";
import { CartContext } from "./CartContextBase";

export const useCart = () => useContext(CartContext);
