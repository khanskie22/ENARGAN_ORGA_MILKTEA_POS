import Image from "next/image";
import type { CartItem as CartItemType } from "@/lib/pos";
import { calculateSubtotal } from "@/lib/pos";
import { formatPeso } from "@/lib/products";

type CartItemProps = {
  item: CartItemType;
  onDecrease: () => void;
  onIncrease: () => void;
  onRemove: () => void;
};

export function CartItem({ item, onDecrease, onIncrease, onRemove }: CartItemProps) {
  const { product, quantity } = item;

  return (
    <li className="cart-item">
      <div className="cart-item-visual">
        <Image
          className={`cart-item-image${product.id === "water" ? " cart-item-image--contain" : ""}`}
          src={product.image}
          alt=""
          fill
          sizes="44px"
        />
      </div>
      <div className="cart-item-details">
        <div className="cart-item-title-row">
          <div>
            <h3>{product.name}</h3>
            <p>{formatPeso(product.price)} each</p>
          </div>
          <button className="remove-button" type="button" onClick={onRemove} aria-label={`Remove ${product.name} from cart`}>
            Remove
          </button>
        </div>
        <div className="cart-item-footer">
          <div className="quantity-control" aria-label={`Quantity for ${product.name}`}>
            <button type="button" onClick={onDecrease} disabled={quantity === 1} aria-label={`Decrease ${product.name} quantity`}>−</button>
            <output aria-label={`${product.name} quantity`}>{quantity}</output>
            <button type="button" onClick={onIncrease} aria-label={`Increase ${product.name} quantity`}>＋</button>
          </div>
          <strong>{formatPeso(calculateSubtotal(item))}</strong>
        </div>
      </div>
    </li>
  );
}

