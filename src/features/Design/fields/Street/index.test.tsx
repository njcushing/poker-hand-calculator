import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
    IPokerHandCalculatorContext,
    PokerHandCalculatorContext,
} from "@/pages/PokerHandCalculator";
import { Street } from ".";

// Mock dependencies
const mockSetPokerHandCalculatorStateProperty = vi.fn();
const mockContextValue = {
    pokerHandCalculatorState: { boardStage: "flop" },
    setPokerHandCalculatorStateProperty: mockSetPokerHandCalculatorStateProperty,
};

describe("The Street component...", () => {
    test("Should render an explicit label with the text: 'Street:'", () => {
        render(<Street />);
        const label = screen.getByLabelText("Street:");
        expect(label).toBeInTheDocument();
    });
    test("Should render a select element", () => {
        render(<Street />);
        const select = screen.getByRole("combobox", { name: "Street:" });
        expect(select).toBeInTheDocument();
    });
    test("That should have the same value as the context's 'boardStage' state", () => {
        render(
            <PokerHandCalculatorContext.Provider
                value={mockContextValue as unknown as IPokerHandCalculatorContext}
            >
                <Street />
            </PokerHandCalculatorContext.Provider>,
        );
        const select = screen.getByRole("combobox", { name: "Street:" });
        expect(select).toBeInTheDocument();
        expect((select as HTMLSelectElement).value).toBe("flop");
    });
    test("Or a value of 'pre-flop' if the context's 'boardState' state is undefined", () => {
        render(
            <PokerHandCalculatorContext.Provider
                value={
                    {
                        ...mockContextValue,
                        pokerHandCalculatorState: { boardStage: undefined },
                    } as unknown as IPokerHandCalculatorContext
                }
            >
                <Street />
            </PokerHandCalculatorContext.Provider>,
        );

        const select = screen.getByRole("combobox", { name: "Street:" });
        expect(select).toBeInTheDocument();
        expect(select).toHaveValue("pre-flop");
    });
    test("Should render four option elements... with the texts: 'Pre-Flop', 'Flop', 'Turn' and 'River'", () => {
        render(<Street />);
        expect(screen.getByRole("option", { name: "Pre-Flop" }));
        expect(screen.getByRole("option", { name: "Flop" }));
        expect(screen.getByRole("option", { name: "Turn" }));
        expect(screen.getByRole("option", { name: "River" }));
    });
    test("Should invoke the state setter provided in context on change", () => {
        render(
            <PokerHandCalculatorContext.Provider
                value={mockContextValue as unknown as IPokerHandCalculatorContext}
            >
                <Street />
            </PokerHandCalculatorContext.Provider>,
        );

        const select = screen.getByRole("combobox", { name: "Street:" });
        expect(select).toBeInTheDocument();
        expect(select).toHaveValue("flop");

        fireEvent.change(select, { target: { value: "turn" } });

        expect(mockSetPokerHandCalculatorStateProperty).toHaveBeenCalledWith("boardStage", "turn");
    });
});
