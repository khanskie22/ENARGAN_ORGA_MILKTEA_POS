# Milk Tea POS Task List

Status key: `[ ]` Not started, `[~]` In progress, `[x]` Completed

## Milestone 1: Planning and project setup

- [x] Document the Scenario 3 requirements and development plan.
- [x] Initialize the Next.js App Router project with TypeScript.
- [x] Create the base desktop-friendly POS layout.

## Milestone 2: Products and cart

- [x] Display all required hard-coded products and Philippine peso prices.
- [x] Add products to the cart.
- [x] Increase and decrease item quantities without allowing quantities below one.
- [x] Remove items from the cart.
- [x] Calculate item subtotals and the order total automatically.

## Milestone 3: Payment and receipt

- [x] Accept a numeric cash payment.
- [x] Validate blank, non-numeric, negative, and insufficient payments.
- [x] Prevent payment confirmation when the cart is empty or payment is invalid.
- [x] Calculate change and display payment confirmation feedback.
- [x] Generate a digital receipt with a transaction reference and complete totals.
- [x] Reset all transaction state with New Transaction.

## Milestone 4: Verification and documentation

- [x] Add automated tests for cart calculations, payment validation, receipt generation, and reset behavior.
- [x] Complete REQUIREMENTS.md, ARCHITECTURE.md, TESTING.md, and AI_USAGE.md.
- [x] Create the root README.md.
- [x] Run the standard checks and confirm the application builds and runs.
- [x] Record final manual test results and mark only verified tasks complete.
