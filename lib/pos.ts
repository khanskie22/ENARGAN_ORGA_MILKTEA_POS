import type { Product } from "./products";

export type CartItem = {
  product: Product;
  quantity: number;
};

export function calculateSubtotal(item: CartItem): number {
  return item.product.price * item.quantity;
}

export function calculateTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + calculateSubtotal(item), 0);
}

export function calculateItemCount(cart: CartItem[]): number {
  return cart.reduce((count, item) => count + item.quantity, 0);
}

