# Testing

Testing was completed on October 13, 2026 using Node.js 24.13.0, Next.js 16.4.0, Vitest 3.2.7, and the Codex in-app Chromium browser.

## Automated checks

| Command | Result | Notes |
| --- | --- | --- |
| `pnpm test` | Passed | 2 test files, 11 tests passed. |
| `pnpm run lint` | Passed | ESLint completed with no warnings or errors. |
| `pnpm run build` | Passed | Next.js production build compiled, type-checked, and generated the `/` route. |
| `pnpm run dev` | Passed | Development server became ready and returned the app at `http://localhost:3000`. |

Automated coverage verifies cart arithmetic, item count, all payment-validation branches, exact payment, payment with change, receipt data, receipt references, cart interactions, and reset behavior.

## Manual test results

| ID | Test | Steps | Expected result | Result |
| --- | --- | --- | --- | --- |
| M-01 | Product display | Open the POS. | All six required products, uploaded product photos, sizes, prices, and Add buttons are visible. | Pass |
| M-02 | Add products | Add Classic Milk Tea and Bottled Water. | Both lines appear with quantity 1 and correct unit prices. | Pass |
| M-03 | Increase quantity | Increase Classic Milk Tea from 1 to 2. | Quantity becomes 2; line subtotal becomes ₱118.00. | Pass |
| M-04 | Decrease boundary | Decrease Classic Milk Tea to 1. | Quantity becomes 1 and the decrement button is disabled. | Pass |
| M-05 | Remove product | Remove Bottled Water. | Its line disappears and totals update. | Pass |
| M-06 | Correct totals | Set Classic Milk Tea to 2 and add one Bottled Water. | Item count is 3 and total is ₱138.00. | Pass |
| M-07 | Blank payment | Submit an empty cash field for a ₱59.00 order. | “Enter the cash amount received.” is shown; no receipt appears. | Pass |
| M-08 | Non-numeric payment | Enter `abc` and submit. | “Enter a valid numeric cash amount.” is shown. | Pass |
| M-09 | Negative payment | Enter `-1` and submit. | “Cash received cannot be negative.” is shown. | Pass |
| M-10 | Insufficient payment | Enter ₱50.00 for a ₱59.00 order. | Insufficient-by-₱9.00 feedback is shown; no receipt appears. | Pass |
| M-11 | Exact payment | Enter ₱59.00 for a ₱59.00 order. | Payment succeeds and receipt change is ₱0.00. | Pass |
| M-12 | Payment with change | Buy Brown Sugar Milk Tea for ₱69.00 and pay ₱100.00. | Receipt displays ₱31.00 change. | Pass |
| M-13 | Receipt contents | Complete a payment. | Reference, date, product, quantity, unit price, subtotal, total, paid amount, and change are shown. | Pass |
| M-14 | New transaction | Select Start new transaction from the receipt. | Receipt closes; cart, cash, feedback, errors, and totals reset. | Pass |
| M-15 | Browser console | Complete the full manual flow and inspect warnings/errors. | No browser console warnings or errors. | Pass |

## Automated test files

- `tests/pos.test.ts` tests deterministic calculations, validation, and receipt helpers.
- `tests/page.test.tsx` tests the user-facing transaction and reset flow.

