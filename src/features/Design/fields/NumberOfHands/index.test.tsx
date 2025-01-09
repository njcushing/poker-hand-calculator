import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
    IPokerHandCalculatorContext,
    PokerHandCalculatorContext,
} from "@/pages/PokerHandCalculator";
import { NumberOfHands } from ".";

// Mock dependencies
const mockSetPokerHandCalculatorStateProperty = vi.fn();
const mockContextValue = {
    pokerHandCalculatorState: { numberOfHands: 4 },
    setPokerHandCalculatorStateProperty: mockSetPokerHandCalculatorStateProperty,
};

describe("The NumberOfHands component...", () => {
    test("Should render a button with the text: 'Remove'", () => {
        render(<NumberOfHands />);
        const removeButton = screen.getByRole("button", { name: "Remove" });
        expect(removeButton).toBeInTheDocument();
    });
    test("Which should invoke the state setter provided in context on click", () => {
        render(
            <PokerHandCalculatorContext.Provider
                value={mockContextValue as unknown as IPokerHandCalculatorContext}
            >
                <NumberOfHands />
            </PokerHandCalculatorContext.Provider>,
        );

        const removeButton = screen.getByRole("button", { name: "Remove" });
        expect(removeButton).toBeInTheDocument();

        fireEvent.click(removeButton);
        fireEvent.mouseLeave(removeButton);

        expect(mockSetPokerHandCalculatorStateProperty).toHaveBeenCalledWith(
            "numberOfHands",
            mockContextValue.pokerHandCalculatorState.numberOfHands - 1,
        );
    });
    test("Should render a button with the text: 'Add'", () => {
        render(<NumberOfHands />);
        const addButton = screen.getByRole("button", { name: "Add" });
        expect(addButton).toBeInTheDocument();
    });
    test("Which should invoke the state setter provided in context on click", () => {
        render(
            <PokerHandCalculatorContext.Provider
                value={mockContextValue as unknown as IPokerHandCalculatorContext}
            >
                <NumberOfHands />
            </PokerHandCalculatorContext.Provider>,
        );

        const addButton = screen.getByRole("button", { name: "Add" });
        expect(addButton).toBeInTheDocument();

        fireEvent.click(addButton);
        fireEvent.mouseLeave(addButton);

        expect(mockSetPokerHandCalculatorStateProperty).toHaveBeenCalledWith(
            "numberOfHands",
            mockContextValue.pokerHandCalculatorState.numberOfHands + 1,
        );
    });
    test("Should render a text element displaying the context's 'numberOfHands' state value", () => {
        render(
            <PokerHandCalculatorContext.Provider
                value={mockContextValue as unknown as IPokerHandCalculatorContext}
            >
                <NumberOfHands />
            </PokerHandCalculatorContext.Provider>,
        );

        const textElement = screen.getByText(
            `${mockContextValue.pokerHandCalculatorState.numberOfHands}`,
        );

        expect(textElement).toBeInTheDocument();
    });
});
