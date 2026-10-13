# Campus Cup POS

Campus Cup POS is a simple, desktop-friendly point-of-sale application for a milk tea and beverage stall near campus. It implements the complete Scenario 3 flow from browsing products through cash payment, receipt generation, and starting a new transaction.

## Main features

- Six hard-coded drinks with Philippine peso pricing
- Add, increase, decrease, and remove cart actions
- Automatic line subtotals, item count, and order total
- Cash validation for blank, non-numeric, negative, and insufficient amounts
- Exact-payment and change calculations
- Digital receipt with a transaction reference and complete payment details
- New Transaction reset
- Accessible labels, status/error feedback, focus styles, and responsive desktop-first layout

## Requirements

- Node.js 20.9 or newer
- npm, pnpm, yarn, or Bun

## Installation

```bash
npm install
```

This repository also includes `pnpm-lock.yaml`, so `pnpm install` may be used instead.

## Development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in a browser.

## Production build

```bash
npm run build
npm start
```

## Testing

```bash
npm test
npm run lint
npm run build
```

The manual checklist and recorded results are in [`docs/TESTING.md`](docs/TESTING.md).

## How it works

- `app/page.tsx` owns the cart, cash input, feedback, payment error, and completed receipt with React `useState`.
- `components/ProductCard.tsx`, `components/CartItem.tsx`, and `components/Receipt.tsx` keep the main screen easy to read and explain.
- `lib/pos.ts` contains pure functions for subtotals, totals, payment validation, change, reference numbers, and receipt snapshots.
- A payment is confirmed only when the cart has an item and the cash input is a finite, non-negative number greater than or equal to the total.
- Receipt generation copies the cart and stores the confirmed totals so the completed sale does not depend on later state changes.
- New Transaction clears every transaction-related state value.

## Documentation

The `/docs` folder is the source of truth:

- `TASKLIST.md` — implementation progress
- `REQUIREMENTS.md` — products, flow, features, and constraints
- `ARCHITECTURE.md` — structure, state, and data flow
- `TESTING.md` — automated and manual verification
- `AI_USAGE.md` — AI-assisted development log

