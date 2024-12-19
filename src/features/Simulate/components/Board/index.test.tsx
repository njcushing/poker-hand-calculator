import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
    PokerHandCalculatorContext,
    IPokerHandCalculatorContext,
} from "@/pages/PokerHandCalculator";
import { RecursivePartial } from "@/utils/types";
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

const mockShuffleBoard = vi.fn();
const mockPokerHandCalculatorContextValue: RecursivePartial<IPokerHandCalculatorContext> = {
    pokerHandCalculatorState: {
        currentHands: [],
        showingHand: 0,
        boardStage: "pre-flop",
        board: [],
    },
    shuffleBoard: mockShuffleBoard,
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
        test("Or three if the 'boardStage' field in the PokerHandCalculator component's state is equal to 'flop'", () => {
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

            let cards = screen.queryAllByLabelText("card");
            expect(cards).toHaveLength(3);

            cards = [
                screen.getByText("A-Heart-false"),
                screen.getByText("2-Heart-false"),
                screen.getByText("3-Heart-false"),
            ];
            cards.forEach((card) => expect(card).toBeInTheDocument());
        });
        test("Or four if the 'boardStage' field in the PokerHandCalculator component's state is equal to 'turn'", () => {
            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        {
                            ...mockPokerHandCalculatorContextValue,
                            pokerHandCalculatorState: {
                                ...mockPokerHandCalculatorContextValue.pokerHandCalculatorState,
                                boardStage: "flop",
                                board: structuredClone([board[0], board[1], board[2], board[3]]),
                            },
                        } as unknown as IPokerHandCalculatorContext
                    }
                >
                    <Board />
                </PokerHandCalculatorContext.Provider>,
            );

            let cards = screen.queryAllByLabelText("card");
            expect(cards).toHaveLength(4);

            cards = [
                screen.getByText("A-Heart-false"),
                screen.getByText("2-Heart-false"),
                screen.getByText("3-Heart-false"),
                screen.getByText("4-Heart-false"),
            ];
            cards.forEach((card) => expect(card).toBeInTheDocument());
        });
        test("Or five if the 'boardStage' field in the PokerHandCalculator component's state is equal to 'river'", () => {
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

            let cards = screen.queryAllByLabelText("card");
            expect(cards).toHaveLength(5);

            cards = [
                screen.getByText("A-Heart-false"),
                screen.getByText("2-Heart-false"),
                screen.getByText("3-Heart-false"),
                screen.getByText("4-Heart-false"),
                screen.getByText("5-Heart-false"),
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
