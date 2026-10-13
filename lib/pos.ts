import type { Product } from "./products";

export type CartItem = {
  product: Product;
  quantity: number;
};

export type PaymentValidation =
  | { valid: true; amountPaid: number; change: number }
  | { valid: false; message: string };

export type ReceiptData = {
  reference: string;
  createdAt: string;
  items: CartItem[];
  total: number;
  amountPaid: number;
  change: number;
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

export function validatePayment(payment: string, total: number, hasItems: boolean): PaymentValidation {
  if (!hasItems) {
    return { valid: false, message: "Add at least one item before confirming payment." };
  }

  if (payment.trim() === "") {
    return { valid: false, message: "Enter the cash amount received." };
  }

  const amountPaid = Number(payment);
  if (!Number.isFinite(amountPaid)) {
    return { valid: false, message: "Enter a valid numeric cash amount." };
  }

  if (amountPaid < 0) {
    return { valid: false, message: "Cash received cannot be negative." };
  }

  if (amountPaid < total) {
    return { valid: false, message: `Cash received is insufficient by ₱${(total - amountPaid).toFixed(2)}.` };
  }

  return { valid: true, amountPaid, change: amountPaid - total };
}

export function createTransactionReference(now: Date): string {
  const parts = [
    now.getFullYear(),
    String(now.getMonth() + 1).padStart(2, "0"),
    String(now.getDate()).padStart(2, "0"),
  ].join("");
  const time = [
    String(now.getHours()).padStart(2, "0"),
    String(now.getMinutes()).padStart(2, "0"),
    String(now.getSeconds()).padStart(2, "0"),
  ].join("");
  return `CC-${parts}-${time}`;
}

export function createReceipt(cart: CartItem[], amountPaid: number, now = new Date()): ReceiptData {
  const total = calculateTotal(cart);
  return {
    reference: createTransactionReference(now),
    createdAt: now.toISOString(),
    items: cart.map((item) => ({ ...item, product: { ...item.product } })),
    total,
    amountPaid,
    change: amountPaid - total,
  };
}


