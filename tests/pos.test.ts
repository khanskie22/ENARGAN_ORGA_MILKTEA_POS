import { describe, expect, it } from "vitest";
import {
  calculateItemCount,
  calculateSubtotal,
  calculateTotal,
  createReceipt,
  createTransactionReference,
  validatePayment,
  type CartItem,
} from "@/lib/pos";
import { PRODUCTS } from "@/lib/products";

const cart: CartItem[] = [
  { product: PRODUCTS[0], quantity: 2 },
  { product: PRODUCTS[5], quantity: 1 },
];

describe("cart calculations", () => {
  it("calculates line subtotals, item count, and order total", () => {
    expect(calculateSubtotal(cart[0])).toBe(118);
    expect(calculateItemCount(cart)).toBe(3);
    expect(calculateTotal(cart)).toBe(138);
  });
});

describe("payment validation", () => {
  it("rejects an empty cart", () => {
    expect(validatePayment("100", 0, false)).toEqual({
      valid: false,
      message: "Add at least one item before confirming payment.",
    });
  });

  it.each([
    ["", "Enter the cash amount received."],
    ["tea", "Enter a valid numeric cash amount."],
    ["-10", "Cash received cannot be negative."],
    ["100", "Cash received is insufficient by ₱38.00."],
  ])("rejects invalid payment %j", (payment, message) => {
    expect(validatePayment(payment, 138, true)).toEqual({ valid: false, message });
  });

  it("accepts exact payment", () => {
    expect(validatePayment("138", 138, true)).toEqual({ valid: true, amountPaid: 138, change: 0 });
  });

  it("accepts payment with change", () => {
    expect(validatePayment("200", 138, true)).toEqual({ valid: true, amountPaid: 200, change: 62 });
  });
});

describe("receipt generation", () => {
  it("creates a complete receipt snapshot and reference", () => {
    const now = new Date(2026, 9, 13, 14, 5, 9);
    const receipt = createReceipt(cart, 200, now);

    expect(receipt.reference).toBe("CC-20261013-140509");
    expect(createTransactionReference(now)).toBe("CC-20261013-140509");
    expect(receipt.total).toBe(138);
    expect(receipt.amountPaid).toBe(200);
    expect(receipt.change).toBe(62);
    expect(receipt.items).not.toBe(cart);
    expect(receipt.items[0]).not.toBe(cart[0]);
  });
});

