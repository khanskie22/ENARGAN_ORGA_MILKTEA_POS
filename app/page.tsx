"use client";

import { type FormEvent, useState } from "react";
import { CartItem } from "@/components/CartItem";
import { ProductCard } from "@/components/ProductCard";
import { Receipt } from "@/components/Receipt";
import {
  calculateItemCount,
  calculateTotal,
  createReceipt,
  validatePayment,
  type CartItem as CartItemType,
  type ReceiptData,
} from "@/lib/pos";
import { PRODUCTS, formatPeso, type Product } from "@/lib/products";

export default function Home() {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [feedback, setFeedback] = useState("");
  const [payment, setPayment] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [receipt, setReceipt] = useState<ReceiptData | null>(null);
  const total = calculateTotal(cart);
  const itemCount = calculateItemCount(cart);

  function addToCart(product: Product) {
    setCart((currentCart) => {
      const existingItem = currentCart.find((item) => item.product.id === product.id);
      if (existingItem) {
        return currentCart.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }
      return [...currentCart, { product, quantity: 1 }];
    });
    setFeedback(`${product.name} added to the order.`);
    setPaymentError("");
  }

  function updateQuantity(productId: string, change: number) {
    setCart((currentCart) => currentCart.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item,
    ));
    setFeedback("Order quantity updated.");
    setPaymentError("");
  }

  function removeFromCart(product: Product) {
    setCart((currentCart) => currentCart.filter((item) => item.product.id !== product.id));
    setFeedback(`${product.name} removed from the order.`);
    setPaymentError("");
  }

  function confirmPayment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const validation = validatePayment(payment, total, cart.length > 0);
    if (!validation.valid) {
      setFeedback("");
      setPaymentError(validation.message);
      return;
    }

    setPaymentError("");
    setFeedback("Payment confirmed successfully.");
    setReceipt(createReceipt(cart, validation.amountPaid));
  }

  function startNewTransaction() {
    setCart([]);
    setPayment("");
    setPaymentError("");
    setFeedback("");
    setReceipt(null);
  }

  return (
    <main className="pos-shell">
      <header className="topbar">
        <div className="brand-mark" aria-hidden="true"><span>●</span></div>
        <div className="brand-copy">
          <p>Campus favorite</p>
          <h1>Campus Cup <span>POS</span></h1>
        </div>
        <div className="counter-status"><span aria-hidden="true" /> Counter ready</div>
      </header>

      <div className="workspace">
        <section className="menu-panel" aria-labelledby="menu-heading">
          <div className="section-heading">
            <div>
              <p className="eyebrow">Freshly mixed</p>
              <h2 id="menu-heading">Choose a drink</h2>
            </div>
            <span className="item-count">{PRODUCTS.length} items</span>
          </div>
          <div className="product-grid">
            {PRODUCTS.map((product) => <ProductCard key={product.id} product={product} onAdd={addToCart} />)}
          </div>
        </section>

        <aside className="order-panel" aria-labelledby="order-heading">
          <div className="order-header">
            <div>
              <p className="eyebrow">Current sale</p>
              <h2 id="order-heading">Your order</h2>
            </div>
            <span className="order-number">{itemCount} {itemCount === 1 ? "item" : "items"}</span>
          </div>
          {cart.length === 0 ? (
            <div className="empty-cart">
              <div className="empty-cart-icon" aria-hidden="true">＋</div>
              <h3>Your cart is empty</h3>
              <p>Add a drink from the menu to begin a new order.</p>
            </div>
          ) : (
            <ul className="cart-list" aria-label="Order items">
              {cart.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onDecrease={() => updateQuantity(item.product.id, -1)}
                  onIncrease={() => updateQuantity(item.product.id, 1)}
                  onRemove={() => removeFromCart(item.product)}
                />
              ))}
            </ul>
          )}
          {feedback && <p className="action-feedback" role="status" aria-live="polite">{feedback}</p>}
          <div className="order-total"><span>Total</span><strong>{formatPeso(total)}</strong></div>
          <form className="payment-form" onSubmit={confirmPayment} noValidate>
            <label htmlFor="cash-payment">Cash received</label>
            <div className={`payment-input-wrap${paymentError ? " payment-input-wrap--error" : ""}`}>
              <span aria-hidden="true">₱</span>
              <input
                id="cash-payment"
                name="cash-payment"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                autoComplete="off"
                placeholder="0.00"
                value={payment}
                onChange={(event) => {
                  setPayment(event.target.value);
                  setPaymentError("");
                }}
                aria-describedby={paymentError ? "payment-error" : "payment-hint"}
                aria-invalid={Boolean(paymentError)}
                disabled={cart.length === 0}
              />
            </div>
            <p id="payment-hint" className="payment-hint">Cash payment only</p>
            {paymentError && <p id="payment-error" className="payment-error" role="alert">{paymentError}</p>}
            <button className="pay-button" type="submit" disabled={cart.length === 0}>Confirm payment</button>
          </form>
        </aside>
      </div>
      {receipt && <Receipt receipt={receipt} onNewTransaction={startNewTransaction} />}
    </main>
  );
}

