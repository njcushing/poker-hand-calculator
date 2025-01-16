import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
    IPokerHandCalculatorContext,
    PokerHandCalculatorContext,
} from "@/pages/PokerHandCalculator";
import { RecursivePartial } from "@/utils/types";
import { Deck, Hand } from "@/features/Deck/utils/deckFuncs";
import { SimulateContext, ISimulateContext } from "../..";
import { CardSelection } from ".";
import { TCard } from "../Card";

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

const mockDeck = newDeck();

const mockHand: Hand = {
    cards: [mockDeck[0], mockDeck[1]],
    strength: {
        value: 0,
        cards: [mockDeck[0], mockDeck[1]],
        rank: "High Card",
        information: "",
    },
};

mockDeck.splice(0, 2);

const mockSwapCard = vi.fn();
const mockPokerHandCalculatorContextValue: RecursivePartial<IPokerHandCalculatorContext> = {
    pokerHandCalculatorState: {
        currentDeck: mockDeck,
        currentHands: [mockHand],
    },
    swapCard: mockSwapCard,
};

const mockSetSelectingCard = vi.fn();
const mockSimulateContextValue: RecursivePartial<ISimulateContext> = {
    selectingCard: [0, 0],
    setSelectingCard: mockSetSelectingCard,
};

vi.mock("@/features/Simulate/components/Card", () => ({
    Card: (props: TCard) => {
        const { info, onClick } = props;
        const { rank, suit } = info;
        return (
            <button
                type="button"
                aria-label="Card Component"
                onClick={() => {
                    if (onClick) onClick();
                }}
            >
                {`${rank}-${suit}`}
            </button>
        );
    },
}));

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

type renderFuncArgs = {
    PokerHandCalculatorContextOverride?: IPokerHandCalculatorContext;
    SimulateContextOverride?: ISimulateContext;
};
const renderFunc = (args: renderFuncArgs = {}) => {
    const { PokerHandCalculatorContextOverride, SimulateContextOverride } = args;

    let PokerHandCalculatorContextValue!: IPokerHandCalculatorContext;
    let SimulateContextValue!: ISimulateContext;

    const { rerender } = render(
        <PokerHandCalculatorContext.Provider
            value={
                PokerHandCalculatorContextOverride ||
                (mockPokerHandCalculatorContextValue as unknown as IPokerHandCalculatorContext)
            }
        >
            <PokerHandCalculatorContext.Consumer>
                {(value) => {
                    PokerHandCalculatorContextValue = value;
                    return null;
                }}
            </PokerHandCalculatorContext.Consumer>
            <SimulateContext.Provider
                value={
                    SimulateContextOverride ||
                    (mockSimulateContextValue as unknown as ISimulateContext)
                }
            >
                <SimulateContext.Consumer>
                    {(value) => {
                        SimulateContextValue = value;
                        return null;
                    }}
                </SimulateContext.Consumer>
                <CardSelection />
            </SimulateContext.Provider>
        </PokerHandCalculatorContext.Provider>,
    );

    return { rerender, PokerHandCalculatorContextValue, SimulateContextValue };
};

describe("The Hand component...", () => {
    afterEach(() => {
        vi.restoreAllMocks();
    });

    describe("Should render an unordered list element...", () => {
        test("Should render a Card component for the card being swapped", () => {
            const { PokerHandCalculatorContextValue, SimulateContextValue } = renderFunc();

            const { pokerHandCalculatorState } = PokerHandCalculatorContextValue;
            const { currentHands } = pokerHandCalculatorState;
            const { selectingCard } = SimulateContextValue;

            expect(selectingCard).not.toBeNull();

            const selectedHand = currentHands[selectingCard![0]];
            const selectedCard = selectedHand.cards[selectingCard![1]];
            const { rank, suit } = selectedCard;

            expect(screen.getByText(`${rank}-${suit}`)).toBeInTheDocument();
        });
        test("Unless the 'selectingCard' state on the Simulate component's context is 'null'", () => {
            const { SimulateContextValue } = renderFunc({
                SimulateContextOverride: {
                    ...mockSimulateContextValue,
                    selectingCard: null,
                } as unknown as ISimulateContext,
            });

            const { selectingCard } = SimulateContextValue;

            expect(selectingCard).toBeNull();

            expect(screen.queryAllByLabelText("Card Component")).toHaveLength(0);
        });
        test("Or the 'selectingCard' state on the Simulate component's context does not represent a valid hand", () => {
            const { SimulateContextValue } = renderFunc({
                SimulateContextOverride: {
                    ...mockSimulateContextValue,
                    selectingCard: [8, 0],
                } as unknown as ISimulateContext,
            });

            const { selectingCard } = SimulateContextValue;

            expect(selectingCard).toStrictEqual([8, 0]);

            expect(screen.queryAllByLabelText("Card Component")).toHaveLength(0);
        });
        test("Or the 'selectingCard' state on the Simulate component's context does not represent a valid card", () => {
            const { SimulateContextValue } = renderFunc({
                SimulateContextOverride: {
                    ...mockSimulateContextValue,
                    selectingCard: [0, 12],
                } as unknown as ISimulateContext,
            });

            const { selectingCard } = SimulateContextValue;

            expect(selectingCard).toStrictEqual([0, 12]);

            expect(screen.queryAllByLabelText("Card Component")).toHaveLength(0);
        });
        test("Should render a Card component for each entry in the 'currentDeck' field in the PokerHandCalculator component's state", () => {
            renderFunc();

            mockDeck.forEach((card) => {
                const { rank, suit } = card;
                expect(screen.getByText(`${rank}-${suit}`)).toBeInTheDocument();
            });
        });
        test("That, when clicked, should invoke the 'swapCard' function in the PokerHandCalculator component's context", () => {
            const { PokerHandCalculatorContextValue } = renderFunc();

            const CardComponents = mockDeck.map((card) => {
                const { rank, suit } = card;
                return screen.getByText(`${rank}-${suit}`);
            });
            expect(CardComponents).toHaveLength(mockDeck.length);

            CardComponents.forEach((CardComponent, i) => {
                fireEvent.click(CardComponent!);
                fireEvent.mouseLeave(CardComponent!);

                expect(mockSwapCard).toHaveBeenCalledWith(
                    mockSimulateContextValue.selectingCard![0],
                    mockSimulateContextValue.selectingCard![1],
                    PokerHandCalculatorContextValue.pokerHandCalculatorState.currentDeck[i].order,
                );
            });
        });
    });

    describe("Should display a 'close' button...", () => {
        test("With the text: 'Close'", () => {
            renderFunc();

            const closeButton = screen.getByRole("button", { name: "Close" });
            expect(closeButton).toBeInTheDocument();
        });
        test("That, when clicked, should invoke the 'setSelectingCard' function in the Simulate component's context, using the existing 'selectingCard' state as its arguments", () => {
            const { SimulateContextValue } = renderFunc();

            const closeButton = screen.getByRole("button", { name: "Close" });
            expect(closeButton).toBeInTheDocument();

            fireEvent.click(closeButton);
            fireEvent.mouseLeave(closeButton);

            expect(mockSetSelectingCard).toHaveBeenCalledWith(
                SimulateContextValue.selectingCard![0],
                SimulateContextValue.selectingCard![1],
            );
        });
    });
});
