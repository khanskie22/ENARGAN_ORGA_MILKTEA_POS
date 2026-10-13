# Architecture

## Application structure

- `app/layout.tsx` defines page metadata and the root document.
- `app/page.tsx` is the client-side POS workspace and owns transaction state.
- `app/globals.css` contains the responsive visual system and component styles.
- `components/ProductCard.tsx` presents one product and its Add action.
- `components/CartItem.tsx` will present quantity and removal controls.
- `components/Receipt.tsx` will render the completed transaction.
- `lib/products.ts` defines the hard-coded catalog and peso formatter.
- `lib/pos.ts` will hold deterministic totals, validation, and receipt helpers.

## Planned state

- `cart`: ordered cart line items and quantities.
- `payment`: the cash input as text so blank and invalid text can be validated.
- `feedback`: the current success or error message.
- `receipt`: an immutable snapshot created only after a valid confirmation.

## Data flow

Product actions update cart state. Derived helpers calculate subtotals and total from the cart on each render. Payment confirmation validates the cart and payment, then snapshots the cart and calculated figures into a receipt. Starting a new transaction clears all transaction state.

