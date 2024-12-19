import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
    IPokerHandCalculatorContext,
    PokerHandCalculatorContext,
} from "@/pages/PokerHandCalculator";
import { RecursivePartial } from "@/utils/types";
import { Hand } from "@/features/Deck/utils/deckFuncs";
import { SimulateContext, ISimulateContext } from "../..";
import { Board } from ".";
import { TCard } from "../Card";

// Mock dependencies
const board = [
    {
        rank: "A",
        suit: "Heart",
        value: 13,
        order: 1,
    },
    {
        rank: "2",
        suit: "Heart",
        value: 1,
        order: 2,
    },
    {
        rank: "3",
        suit: "Heart",
        value: 2,
        order: 3,
    },
    {
        rank: "4",
        suit: "Heart",
        value: 3,
        order: 4,
    },
    {
        rank: "5",
        suit: "Heart",
        value: 4,
        order: 5,
    },
];

const handCards = [
    {
        rank: "6",
        suit: "Heart",
        value: 5,
        order: 6,
    },
    {
        rank: "7",
        suit: "Heart",
        value: 6,
        order: 7,
    },
] as Hand["cards"];
const hand: Hand = {
    cards: handCards,
    strength: {
        value: 0,
        cards: [...handCards, board[2], board[3], board[4]] as Hand["strength"]["cards"],
        rank: "High Card",
        information: "",
    },
};

const mockShuffleBoard = vi.fn();
const mockPokerHandCalculatorContextValue: RecursivePartial<IPokerHandCalculatorContext> = {
    pokerHandCalculatorState: {
        currentHands: [hand],
        strongestHands: [{ hand, index: 0 }],
        showingHand: 0,
        boardStage: "pre-flop",
        board: [],
    },
    shuffleBoard: mockShuffleBoard,
};

const mockSetSelectingCard = vi.fn();
const mockSimulateContextValue: RecursivePartial<ISimulateContext> = {
    selectingCard: [0, 0],
    setSelectingCard: mockSetSelectingCard,
};

vi.mock("@/features/Simulate/components/Card", () => ({
    Card: (props: TCard) => {
        const { info, showing, onClick } = props;
        const { rank, suit } = info;
        return (
            <button
                type="button"
                aria-label="card"
                onClick={() => {
                    if (onClick) onClick();
                }}
            >
                {`${rank}-${suit}-${showing}`}
            </button>
        );
    },
}));

describe("The Board component...", () => {
    afterEach(() => {
        mockShuffleBoard.mockRestore();

        mockSetSelectingCard.mockRestore();
    });

    test("Should render text identifying the board", () => {
        render(<Board />);
        const boardName = screen.getByText("Board");
        expect(boardName).toBeInTheDocument();
    });
    describe("Should display child Card components...", () => {
        test("Unless the 'boardStage' field in the PokerHandCalculator component's state is equal to 'pre-flop'", () => {
            render(<Board />);
            const cards = screen.queryAllByLabelText("card");
            expect(cards).toHaveLength(0);
        });
        test("Or however many are in the 'board' field in the PokerHandCalculator component's state", () => {
            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        {
                            ...mockPokerHandCalculatorContextValue,
                            pokerHandCalculatorState: {
                                ...mockPokerHandCalculatorContextValue.pokerHandCalculatorState,
                                boardStage: "river",
                                board: structuredClone([
                                    board[0],
                                    board[1],
                                    board[2],
                                    board[3],
                                    board[4],
                                ]),
                            },
                        } as unknown as IPokerHandCalculatorContext
                    }
                >
                    <Board />
                </PokerHandCalculatorContext.Provider>,
            );

            let cards = screen.getAllByLabelText("card");
            expect(cards).toHaveLength(5);

            cards = [
                screen.getByText("A-Heart-false"),
                screen.getByText("2-Heart-false"),
                screen.getByText("3-Heart-true"),
                screen.getByText("4-Heart-true"),
                screen.getByText("5-Heart-true"),
            ];
            cards.forEach((card) => expect(card).toBeInTheDocument());
        });
        test("And each card, when clicked, should invoke the 'setSelectingCard' function from the Interactive component's context", () => {
            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        {
                            ...mockPokerHandCalculatorContextValue,
                            pokerHandCalculatorState: {
                                ...mockPokerHandCalculatorContextValue.pokerHandCalculatorState,
                                boardStage: "flop",
                                board: structuredClone([
                                    board[0],
                                    board[1],
                                    board[2],
                                    board[3],
                                    board[4],
                                ]),
                            },
                        } as unknown as IPokerHandCalculatorContext
                    }
                >
                    <SimulateContext.Provider
                        value={mockSimulateContextValue as unknown as ISimulateContext}
                    >
                        <Board />
                    </SimulateContext.Provider>
                </PokerHandCalculatorContext.Provider>,
            );

            const cards = screen.getAllByLabelText("card");
            cards.forEach((card) => fireEvent.click(card));

            expect(mockSetSelectingCard).toHaveBeenCalledTimes(5);
        });
        test("And any card that comprises the strongest combination of cards being shown should be passed a 'showing' prop equal to 'true'", () => {
            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        {
                            ...mockPokerHandCalculatorContextValue,
                            pokerHandCalculatorState: {
                                ...mockPokerHandCalculatorContextValue.pokerHandCalculatorState,
                                boardStage: "flop",
                                board: structuredClone([
                                    board[0],
                                    board[1],
                                    board[2],
                                    board[3],
                                    board[4],
                                ]),
                            },
                        } as unknown as IPokerHandCalculatorContext
                    }
                >
                    <Board />
                </PokerHandCalculatorContext.Provider>,
            );

            const cards = [
                screen.getByText("A-Heart-false"),
                screen.getByText("2-Heart-false"),
                screen.getByText("3-Heart-true"),
                screen.getByText("4-Heart-true"),
                screen.getByText("5-Heart-true"),
            ];
            cards.forEach((card) => expect(card).toBeInTheDocument());
        });
    });
    describe("Should display a 'shuffle board' button...", () => {
        test("Unless the 'boardStage' field in the PokerHandCalculator component's state is equal to 'pre-flop'", () => {
            render(<Board />);
            const shuffleBoardButton = screen.queryByRole("button", { name: "Cycle" });
            expect(shuffleBoardButton).not.toBeInTheDocument();
        });
        test("With the text: 'Cycle'", () => {
            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        {
                            ...mockPokerHandCalculatorContextValue,
                            pokerHandCalculatorState: {
                                ...mockPokerHandCalculatorContextValue.pokerHandCalculatorState,
                                boardStage: "flop",
                                board: structuredClone([board[0], board[1], board[2]]),
                            },
                        } as unknown as IPokerHandCalculatorContext
                    }
                >
                    <Board />
                </PokerHandCalculatorContext.Provider>,
            );

            const shuffleBoardButton = screen.getByRole("button", { name: "Cycle" });
            expect(shuffleBoardButton).toBeInTheDocument();
        });
        test("That, when clicked, should invoke the 'shuffleBoard' function in the PokerHandCalculator component's context", () => {
            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        {
                            ...mockPokerHandCalculatorContextValue,
                            pokerHandCalculatorState: {
                                ...mockPokerHandCalculatorContextValue.pokerHandCalculatorState,
                                boardStage: "flop",
                                board: structuredClone([board[0], board[1], board[2]]),
                            },
                        } as unknown as IPokerHandCalculatorContext
                    }
                >
                    <Board />
                </PokerHandCalculatorContext.Provider>,
            );

            const shuffleHandButton = screen.getByRole("button", { name: "Cycle" });
            expect(shuffleHandButton).toBeInTheDocument();

            fireEvent.click(shuffleHandButton);
            fireEvent.mouseLeave(shuffleHandButton);

            expect(mockShuffleBoard).toHaveBeenCalled();
        });
    });
});
