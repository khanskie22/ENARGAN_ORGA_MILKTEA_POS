import type { ReceiptData } from "@/lib/pos";
import { calculateSubtotal } from "@/lib/pos";
import { formatPeso } from "@/lib/products";

type ReceiptProps = {
  receipt: ReceiptData;
  onNewTransaction: () => void;
};

export function Receipt({ receipt, onNewTransaction }: ReceiptProps) {
  const dateLabel = new Intl.DateTimeFormat("en-PH", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(receipt.createdAt));

  return (
    <div className="receipt-backdrop">
      <section className="receipt" role="dialog" aria-modal="true" aria-labelledby="receipt-heading">
        <div className="receipt-success-icon" aria-hidden="true">✓</div>
        <p className="receipt-kicker">Payment successful</p>
        <h2 id="receipt-heading">Transaction complete</h2>
        <p className="receipt-reference">{receipt.reference}</p>
        <p className="receipt-date">{dateLabel}</p>

        <div className="receipt-divider" aria-hidden="true" />
        <div className="receipt-column-labels" aria-hidden="true">
          <span>Item</span><span>Subtotal</span>
        </div>
        <ul className="receipt-items" aria-label="Purchased items">
          {receipt.items.map((item) => (
            <li key={item.product.id}>
              <div>
                <strong>{item.product.name}</strong>
                <span>{item.quantity} × {formatPeso(item.product.price)}</span>
              </div>
              <strong>{formatPeso(calculateSubtotal(item))}</strong>
            </li>
          ))}
        </ul>
        <div className="receipt-divider" aria-hidden="true" />

        <dl className="receipt-totals">
          <div><dt>Total amount</dt><dd>{formatPeso(receipt.total)}</dd></div>
          <div><dt>Amount paid</dt><dd>{formatPeso(receipt.amountPaid)}</dd></div>
          <div className="receipt-change"><dt>Change</dt><dd>{formatPeso(receipt.change)}</dd></div>
        </dl>

        <button className="new-transaction-button" type="button" onClick={onNewTransaction} autoFocus>
          Start new transaction
        </button>
        <p className="receipt-thanks">Thank you for choosing Campus Cup.</p>
      </section>
    </div>
  );
}

