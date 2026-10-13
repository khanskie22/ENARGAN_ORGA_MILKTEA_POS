# Architecture

## Application structure

- `app/layout.tsx` defines page metadata and the root document.
- `app/page.tsx` is the client-side POS workspace and owns transaction state.
- `app/globals.css` contains the responsive visual system and component styles.
- `components/ProductCard.tsx` presents one product and its Add action.
- `components/CartItem.tsx` presents quantity and removal controls.
- `components/Receipt.tsx` renders the completed transaction in an accessible dialog.
- `lib/products.ts` defines the hard-coded catalog, local product-image paths, and peso formatter.
- `public/images/products/` stores the six product photos served by Next.js.
- `lib/pos.ts` holds deterministic cart totals, payment validation, reference generation, and receipt snapshot helpers.

## Planned state

- `cart`: ordered cart line items and quantities.
- `payment`: the cash input as text so blank and invalid text can be validated before conversion.
- `paymentError`: a specific validation message announced by assistive technology.
- `feedback`: the current success or error message.
- `receipt`: an immutable snapshot created only after a valid confirmation.

## Data flow

Product actions update cart state. Pure derived helpers calculate item count, subtotals, and total from the cart on each render. Cart updates are immutable: adding an existing product increments it, quantity changes are clamped to a minimum of one, and removal filters out a line.

Submitting the cash form passes the raw string, total, and cart status to `validatePayment`. A valid result supplies the numeric amount and change. `createReceipt` then makes a copied snapshot of the current cart and calculated figures, preventing later state changes from altering the completed receipt. Starting a new transaction clears the cart, cash input, feedback, error, and receipt state.

## Validation and calculations

- `calculateSubtotal` multiplies a product’s hard-coded price by its quantity.
- `calculateTotal` reduces all line subtotals into one total.
- `validatePayment` checks the empty-cart condition first, then blank, non-numeric, negative, and insufficient cash in that order.
- A successful validation returns the parsed cash amount and `amountPaid - total` change.
- `createTransactionReference` creates `CC-YYYYMMDD-HHMMSS` from the confirmation time.

## Component responsibilities

| Component | Responsibility |
| --- | --- |
| `Home` | Owns transaction state and coordinates all user actions. |
| `ProductCard` | Displays one catalog item with its local product photo and exposes an accessible Add action. |
| `CartItem` | Displays one order line with a product thumbnail, subtotal, safe quantity controls, and removal. |
| `Receipt` | Displays the immutable completed-sale snapshot and New Transaction action. |

