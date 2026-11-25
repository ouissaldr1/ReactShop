import { createContext } from "react";
import type { CartItem, Product } from "../types/product";

export type CartContextType = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | null>(null);
