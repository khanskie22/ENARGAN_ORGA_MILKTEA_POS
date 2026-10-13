# Architecture

## Application structure

- `app/layout.tsx` defines page metadata and the root document.
- `app/page.tsx` is the client-side POS workspace and owns transaction state.
- `app/globals.css` contains the responsive visual system and component styles.
- `components/ProductCard.tsx` presents one product and its Add action.
- `components/CartItem.tsx` presents quantity and removal controls.
- `components/Receipt.tsx` will render the completed transaction.
- `lib/products.ts` defines the hard-coded catalog and peso formatter.
- `lib/pos.ts` holds deterministic cart totals and will also contain payment and receipt helpers.

## Planned state

- `cart`: ordered cart line items and quantities.
- `payment`: the cash input as text so blank and invalid text can be validated.
- `feedback`: the current success or error message.
- `receipt`: an immutable snapshot created only after a valid confirmation.

## Data flow

Product actions update cart state. Pure derived helpers calculate item count, subtotals, and total from the cart on each render. Cart updates are immutable: adding an existing product increments it, quantity changes are clamped to a minimum of one, and removal filters out a line. Payment confirmation will validate the cart and payment, then snapshot the cart and calculated figures into a receipt. Starting a new transaction will clear all transaction state.

