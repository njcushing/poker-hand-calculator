import { vi } from "vitest";
import { render, screen, fireEvent, within } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
    IPokerHandCalculatorContext,
    PokerHandCalculatorContext,
} from "@/pages/PokerHandCalculator";
import { RecursivePartial } from "@/utils/types";
import { Deck } from "@/features/Deck/utils/deckFuncs";
import { SimulateContext, ISimulateContext } from "../..";
import { CardSelection } from ".";
import { suitSVG } from "../Card/utils/suitSVG";

// Mock dependencies
function newDeck(): Deck {
    return [
        { rank: "A", suit: "Heart", value: 13, order: 1 },
        { rank: "2", suit: "Heart", value: 1, order: 2 },
        { rank: "3", suit: "Heart", value: 2, order: 3 },
        { rank: "4", suit: "Heart", value: 3, order: 4 },
        { rank: "5", suit: "Heart", value: 4, order: 5 },
        { rank: "6", suit: "Heart", value: 5, order: 6 },
        { rank: "7", suit: "Heart", value: 6, order: 7 },
        { rank: "8", suit: "Heart", value: 7, order: 8 },
        { rank: "9", suit: "Heart", value: 8, order: 9 },
        { rank: "10", suit: "Heart", value: 9, order: 10 },
        { rank: "J", suit: "Heart", value: 10, order: 11 },
        { rank: "Q", suit: "Heart", value: 11, order: 12 },
        { rank: "K", suit: "Heart", value: 12, order: 13 },
        { rank: "A", suit: "Club", value: 13, order: 14 },
        { rank: "2", suit: "Club", value: 1, order: 15 },
        { rank: "3", suit: "Club", value: 2, order: 16 },
        { rank: "4", suit: "Club", value: 3, order: 17 },
        { rank: "5", suit: "Club", value: 4, order: 18 },
        { rank: "6", suit: "Club", value: 5, order: 19 },
        { rank: "7", suit: "Club", value: 6, order: 20 },
        { rank: "8", suit: "Club", value: 7, order: 21 },
        { rank: "9", suit: "Club", value: 8, order: 22 },
        { rank: "10", suit: "Club", value: 9, order: 23 },
        { rank: "J", suit: "Club", value: 10, order: 24 },
        { rank: "Q", suit: "Club", value: 11, order: 25 },
        { rank: "K", suit: "Club", value: 12, order: 26 },
    ];
}

const mockSwapCard = vi.fn();
const mockPokerHandCalculatorContextValue: RecursivePartial<IPokerHandCalculatorContext> = {
    pokerHandCalculatorState: {
        currentDeck: newDeck(),
    },
    swapCard: mockSwapCard,
};

const mockSetSelectingCard = vi.fn();
const mockSimulateContextValue: RecursivePartial<ISimulateContext> = {
    selectingCard: [0, 0],
    setSelectingCard: mockSetSelectingCard,
};

vi.mock("@/features/HandRankings", () => ({
    HandRankings: () => <div>HandRankings Component</div>,
}));

vi.mock("@/features/Deck/utils/deckFuncs", async (importOriginal) => {
    const actual = await importOriginal();
    return {
        ...(actual || {}),
        createDeck: () => newDeck(),
    };
});

vi.mock("../Card/utils/suitSVG", () => ({
    suitSVG: vi.fn(() => <svg></svg>),
}));

describe("The Hand component...", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    test("Should render a paragraph element with text identifying that the component is displaying the available cards", () => {
        render(<CardSelection />);
        const title = screen.getByText("Available Cards");
        expect(title.tagName).toBe("P");
        expect(title).toBeInTheDocument();
    });

    describe("Should render an unordered list element...", () => {
        test("Containing a listitem element for each entry in the 'currentDeck' field in the PokerHandCalculator component's state", () => {
            render(<CardSelection />);

            const deckLength = newDeck().length;

            const unorderedList = screen.getByRole("list");
            expect(unorderedList).toBeInTheDocument();

            const listItems = screen.getAllByRole("listitem");
            expect(listItems).toHaveLength(deckLength);

            listItems.forEach((listItem) => expect(unorderedList).toContainElement(listItem));
        });
        test("That, in turn, each contain a button element", () => {
            render(<CardSelection />);

            const deckLength = newDeck().length;

            const listItems = screen.getAllByRole("listitem");
            expect(listItems).toHaveLength(deckLength);

            listItems.forEach((listItem) => {
                const button = within(listItem).getByRole("button");
                expect(button).toBeInTheDocument();
            });
        });
        test("That, when clicked, should invoke the 'swapCard' function in the PokerHandCalculator component's context", () => {
            let contextValue: IPokerHandCalculatorContext;

            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        mockPokerHandCalculatorContextValue as unknown as IPokerHandCalculatorContext
                    }
                >
                    <PokerHandCalculatorContext.Consumer>
                        {(value) => {
                            contextValue = value;
                            return null;
                        }}
                    </PokerHandCalculatorContext.Consumer>
                    <SimulateContext.Provider
                        value={mockSimulateContextValue as unknown as ISimulateContext}
                    >
                        <CardSelection />
                    </SimulateContext.Provider>
                </PokerHandCalculatorContext.Provider>,
            );

            const deckLength = newDeck().length;

            const listItems = screen.getAllByRole("listitem");
            expect(listItems).toHaveLength(deckLength);

            listItems.forEach((listItem, i) => {
                const button = within(listItem).getByRole("button");
                expect(button).toBeInTheDocument();

                fireEvent.click(button!);
                fireEvent.mouseLeave(button!);

                expect(mockSwapCard).toHaveBeenCalledWith(
                    mockSimulateContextValue.selectingCard![0],
                    mockSimulateContextValue.selectingCard![1],
                    contextValue.pokerHandCalculatorState.currentDeck[i].order,
                );
            });
        });
        test("And each button should contain a paragraph element with text equal to the 'rank' of that card", () => {
            let contextValue: IPokerHandCalculatorContext;

            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        mockPokerHandCalculatorContextValue as unknown as IPokerHandCalculatorContext
                    }
                >
                    <PokerHandCalculatorContext.Consumer>
                        {(value) => {
                            contextValue = value;
                            return null;
                        }}
                    </PokerHandCalculatorContext.Consumer>
                    <SimulateContext.Provider
                        value={mockSimulateContextValue as unknown as ISimulateContext}
                    >
                        <CardSelection />
                    </SimulateContext.Provider>
                </PokerHandCalculatorContext.Provider>,
            );

            const deckLength = newDeck().length;

            const listItems = screen.getAllByRole("listitem");
            expect(listItems).toHaveLength(deckLength);

            listItems.forEach((listItem, i) => {
                const button = within(listItem).getByRole("button");
                expect(button).toBeInTheDocument();

                const rank = within(button!).getByText(
                    contextValue.pokerHandCalculatorState.currentDeck[i].rank,
                );
                expect(rank).toBeInTheDocument();
            });
        });
        test("And should call the 'suitSVG' function with the 'suit' of that card as the argument", () => {
            let contextValue: IPokerHandCalculatorContext;

            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        mockPokerHandCalculatorContextValue as unknown as IPokerHandCalculatorContext
                    }
                >
                    <PokerHandCalculatorContext.Consumer>
                        {(value) => {
                            contextValue = value;
                            return null;
                        }}
                    </PokerHandCalculatorContext.Consumer>
                    <SimulateContext.Provider
                        value={mockSimulateContextValue as unknown as ISimulateContext}
                    >
                        <CardSelection />
                    </SimulateContext.Provider>
                </PokerHandCalculatorContext.Provider>,
            );

            const deckLength = newDeck().length;

            const listItems = screen.getAllByRole("listitem");
            expect(listItems).toHaveLength(deckLength);

            listItems.forEach((listItem, i) => {
                expect(suitSVG).toHaveBeenCalledWith(
                    contextValue.pokerHandCalculatorState.currentDeck[i].suit,
                );
            });
        });
    });

    describe("Should display a 'close' button...", () => {
        test("With the text: 'Close'", () => {
            render(<CardSelection />);
            const closeButton = screen.getByRole("button", { name: "Close" });
            expect(closeButton).toBeInTheDocument();
        });
        test("That, when clicked, should invoke the 'setSelectingCard' function in the Simulate component's context, using the existing 'selectingCard' state as its arguments", () => {
            render(
                <SimulateContext.Provider
                    value={mockSimulateContextValue as unknown as ISimulateContext}
                >
                    <CardSelection />
                </SimulateContext.Provider>,
            );

            const closeButton = screen.getByRole("button", { name: "Close" });
            expect(closeButton).toBeInTheDocument();

            fireEvent.click(closeButton);
            fireEvent.mouseLeave(closeButton);

            expect(mockSetSelectingCard).toHaveBeenCalledWith(
                mockSimulateContextValue.selectingCard![0],
                mockSimulateContextValue.selectingCard![1],
            );
        });
    });
});
