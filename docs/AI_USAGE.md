# AI Usage Log

AI assistance was used to plan, implement, review, and test this project. Every result was checked against the Scenario 3 requirements and verified with automated tests plus live browser testing.

## Prompt 1: Project structure and cart workflow

### Exact prompt used

> Build a functional desktop-friendly Point-of-Sale application using Next.js for Scenario 3: Milk Tea and Beverage Shop POS. Use the App Router, TypeScript, React useState, and the six required hard-coded products and prices. Implement product cards, add-to-cart, increase, decrease, removal, line subtotals, and the overall total. Keep quantities at a minimum of one, use Philippine peso formatting, and keep the code simple enough to explain during an examination.

### Purpose

Establish the Next.js project structure and implement the product and cart portion of the required transaction flow.

### Summary of the AI response

The AI proposed a client-owned state model, reusable `ProductCard` and `CartItem` components, a hard-coded typed product catalog, and pure total-calculation functions. It also produced a responsive two-column interface.

### Evaluation of correctness

The component split and immutable cart updates matched the scope. Totals and quantity boundaries passed automated and live browser checks.

### Modifications before use

The original dependency pin was upgraded after the package registry identified a vulnerable Next.js release. Styling was refined into a simpler campus-stall visual language, and accessible labels/status regions were added before acceptance.

## Prompt 2: Payment, receipt, reset, and verification

### Exact prompt used

> Implement numeric cash payment for the milk tea POS. Reject blank, non-numeric, negative, and insufficient input; prevent confirmation for an empty cart; calculate change as Amount Paid minus Total Amount; generate a receipt with a transaction reference, item names, quantities, unit prices, subtotals, total, paid amount, and change; then add a New Transaction action that clears every transaction value. Add automated tests for all validation branches and the complete UI flow.

### Purpose

Complete the payment-to-reset portion of the transaction and make the behavior verifiable.

### Summary of the AI response

The AI added pure validation and receipt helpers, a cash form with explicit feedback, a receipt dialog, a full state reset, unit tests, and React interaction tests.

### Evaluation of correctness

All 11 automated tests passed. Live browser testing confirmed exact payment, change, receipt contents, reset behavior, and every required invalid-input message with no console errors.

### Modifications before use

The test setup was corrected to clean the DOM after each test when the first combined run exposed test-state leakage. The receipt layout and cart height were adjusted after visual inspection so payment controls remain readable on a laptop screen.

