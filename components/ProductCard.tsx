import Image from "next/image";
import type { Product } from "@/lib/products";
import { formatPeso } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  onAdd?: (product: Product) => void;
};

export function ProductCard({ product, onAdd }: ProductCardProps) {
  return (
    <article className="product-card">
      <div className="product-visual">
        <Image
          className={`product-image${product.id === "water" ? " product-image--contain" : ""}`}
          src={product.image}
          alt={product.name}
          fill
          loading={product.id === "classic" ? "eager" : "lazy"}
          sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 240px"
        />
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

