# Requirements

## Project objective

Campus Cup POS is a desktop-friendly point-of-sale application for a milk tea and beverage stall near campus. It must support this complete transaction flow:

**Browse Products → Add to Cart → Review Order → Enter Payment → Validate Payment → Confirm Payment → Display Receipt → Start New Transaction**

## Product catalog

| Product | Size | Price |
| --- | --- | ---: |
| Classic Milk Tea | Regular | ₱59.00 |
| Wintermelon Milk Tea | Regular | ₱65.00 |
| Taro Milk Tea | Regular | ₱65.00 |
| Fruit Tea - Lychee | Regular | ₱55.00 |
| Brown Sugar Milk Tea | Regular | ₱69.00 |
| Bottled Water | — | ₱20.00 |

Products and prices are hard-coded. There is no inventory or database.

## Functional requirements

1. Display every product with its name, price, and Add button.
2. Add products to an order and show quantity, unit price, and subtotal.
3. Increase, decrease, and remove cart items; quantities never go below one.
4. Recalculate item subtotals and the overall total automatically.
5. Accept a cash amount and reject blank, non-numeric, negative, or insufficient values.
6. Prevent confirmation when the cart is empty or payment is invalid.
7. Calculate change as `Amount Paid - Total Amount`.
8. Confirm successful payments with clear feedback.
9. Produce a digital receipt with reference number, line items, quantities, unit prices, subtotals, total, amount paid, and change.
10. Start a new transaction by clearing the cart, payment, feedback, confirmation, and receipt.

## Technical and usability constraints

- Next.js App Router and TypeScript.
- React client-side state with `useState`.
- No authentication, database, real payment processor, QR/card payment, inventory, or deployment.
- Philippine peso formatting.
- Accessible labels, controls, feedback, and keyboard focus styles.
- A simple, polished layout optimized for laptop and desktop use while remaining usable on small screens.

