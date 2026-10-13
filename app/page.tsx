"use client";

import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS, formatPeso } from "@/lib/products";

export default function Home() {
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
            {PRODUCTS.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </section>

        <aside className="order-panel" aria-labelledby="order-heading">
          <div className="order-header">
            <div>
              <p className="eyebrow">Current sale</p>
              <h2 id="order-heading">Your order</h2>
            </div>
            <span className="order-number">#—</span>
          </div>
          <div className="empty-cart">
            <div className="empty-cart-icon" aria-hidden="true">＋</div>
            <h3>Your cart is empty</h3>
            <p>Add a drink from the menu to begin a new order.</p>
          </div>
          <div className="order-total"><span>Total</span><strong>{formatPeso(0)}</strong></div>
          <button className="pay-button" type="button" disabled>Review payment</button>
        </aside>
      </div>
    </main>
  );
}

