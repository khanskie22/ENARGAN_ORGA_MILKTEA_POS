import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import Home from "@/app/page";

describe("POS transaction flow", () => {
  it("adds items, updates quantities, validates payment, shows a receipt, and resets", async () => {
    const user = userEvent.setup();
    render(<Home />);

    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Add Classic Milk Tea to cart" }));
    expect(screen.getByText("1 item")).toBeInTheDocument();
    expect(screen.getByText("₱59.00 each")).toBeInTheDocument();
    const actionFeedback = screen.getByText("Classic Milk Tea added to the order.");
    expect(actionFeedback).toHaveAttribute("role", "status");
    expect(actionFeedback).toBeVisible();

    await user.click(screen.getByRole("button", { name: "Increase Classic Milk Tea quantity" }));
    expect(screen.getByText("2 items")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Decrease Classic Milk Tea quantity" })).toBeEnabled();

    await user.click(screen.getByRole("button", { name: "Decrease Classic Milk Tea quantity" }));
    expect(screen.getByRole("button", { name: "Decrease Classic Milk Tea quantity" })).toBeDisabled();

    await user.click(screen.getByRole("button", { name: "Confirm payment" }));
    expect(screen.getByRole("alert")).toHaveTextContent("Enter the cash amount received.");

    const payment = screen.getByLabelText("Cash received");
    expect(payment).toHaveAttribute("type", "number");
    expect(payment).toHaveAttribute("min", "0");
    expect(payment).toHaveAttribute("step", "0.01");
    await user.type(payment, "abc");
    expect(payment).toHaveValue(null);

    await user.clear(payment);
    await user.type(payment, "50");
    await user.click(screen.getByRole("button", { name: "Confirm payment" }));
    expect(screen.getByRole("alert")).toHaveTextContent("insufficient by ₱9.00");

    await user.clear(payment);
    await user.type(payment, "100");
    await user.click(screen.getByRole("button", { name: "Confirm payment" }));

    const receipt = screen.getByRole("dialog", { name: "Transaction complete" });
    expect(within(receipt).getByText("Payment successful")).toBeInTheDocument();
    expect(within(receipt).getByText("₱41.00")).toBeInTheDocument();
    expect(within(receipt).getByText(/CC-\d{8}-\d{6}/)).toBeInTheDocument();

    await user.click(within(receipt).getByRole("button", { name: "Start new transaction" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
    expect(screen.getByLabelText("Cash received")).toHaveValue(null);
  });

  it("removes a cart item", async () => {
    const user = userEvent.setup();
    render(<Home />);
    await user.click(screen.getByRole("button", { name: "Add Bottled Water to cart" }));
    await user.click(screen.getByRole("button", { name: "Remove Bottled Water from cart" }));
    expect(screen.getByText("Your cart is empty")).toBeInTheDocument();
  });
});

