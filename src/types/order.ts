import type { CheckoutForm } from "./form";
import type { CartItem } from "./product";

export type Order = {
  customer: CheckoutForm;
  items: CartItem[];
  totalPrice: number;
};
