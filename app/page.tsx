"use client";

import { useState } from "react";
import { CartItem } from "@/components/CartItem";
import { ProductCard } from "@/components/ProductCard";
import { calculateItemCount, calculateTotal, type CartItem as CartItemType } from "@/lib/pos";
import { PRODUCTS, formatPeso, type Product } from "@/lib/products";

export default function Home() {
  const [cart, setCart] = useState<CartItemType[]>([]);
  const [feedback, setFeedback] = useState("");
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
  }

  function updateQuantity(productId: string, change: number) {
    setCart((currentCart) => currentCart.map((item) =>
      item.product.id === productId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item,
    ));
    setFeedback("Order quantity updated.");
  }

  function removeFromCart(product: Product) {
    setCart((currentCart) => currentCart.filter((item) => item.product.id !== product.id));
    setFeedback(`${product.name} removed from the order.`);
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
          <p className="sr-status" role="status" aria-live="polite">{feedback}</p>
          <div className="order-total"><span>Total</span><strong>{formatPeso(total)}</strong></div>
          <button className="pay-button" type="button" disabled={cart.length === 0}>Review payment</button>
        </aside>
      </div>
    </main>
  );
}

