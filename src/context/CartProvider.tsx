import type { CartItem, Product } from "../types/product";
import { CartContext } from "./cart";
import { useLocalStorage } from "../hooks/useLocalStorage";
import type { ReactNode } from "react";

export default function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useLocalStorage<CartItem[]>("reactshop-cart", []);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  function addToCart(product: Product, quantity: number) {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? {
                ...item,
                quantity: Math.min(item.quantity + quantity, product.stock),
              }
            : item,
        );
      }
      return [
        ...prev,
        { product, quantity: Math.min(quantity, product.stock) },
      ];
    });
  }

  function removeFromCart(productId: number) {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }

  function updateQuantity(productId: number, quantity: number) {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === productId
          ? { ...item, quantity: Math.min(quantity, item.product.stock) }
          : item,
      ),
    );
  }

  function clearCart() {
    setItems([]);
  }

  const value = {
    items,
    totalItems,
    totalPrice,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
