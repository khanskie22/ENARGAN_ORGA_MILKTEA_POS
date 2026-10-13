import type { Product } from "@/lib/products";
import { formatPeso } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  onAdd?: (product: Product) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className={`product-visual product-visual--${product.tone}`} aria-hidden="true">
        <span className="cup-lid" />
        <span className="cup-body">{product.abbreviation}</span>
      </div>
      <div className="product-info">
        <div>
          <h3>{product.name}</h3>
          <p>{product.size ?? "Refreshing"}</p>
        </div>
        <div className="product-action-row">
          <strong>{formatPeso(product.price)}</strong>
          <button type="button" onClick={() => onAdd?.(product)} aria-label={`Add ${product.name} to cart`}>
            <span aria-hidden="true">＋</span> Add
          </button>
        </div>
      </div>
    </article>
  );
}

