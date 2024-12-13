import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
    IPokerHandCalculatorContext,
    PokerHandCalculatorContext,
} from "@/pages/PokerHandCalculator";
import { RecursivePartial } from "@/utils/types";
import { SimulateContext, ISimulateContext } from "../..";
import { Hand, THand } from ".";
import { TCard } from "../Card";

// Mock dependencies
const cards = [
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
] as THand["info"]["cards"];
const defaultProps: THand = {
    info: {
        cards,
        strength: {
            value: 0,
            cards,
            rank: "High Card",
            information: "",
        },
    },
    number: 1,
};

const mockShuffleHand = vi.fn();
const mockDeleteHand = vi.fn();
const mockShowHand = vi.fn();
const mockPokerHandCalculatorContextValue: RecursivePartial<IPokerHandCalculatorContext> = {
    pokerHandCalculatorState: {
        numberOfHands: 1,
        strongestHands: [{ hand: defaultProps.info, index: defaultProps.number - 1 }],
    } as Pick<
        IPokerHandCalculatorContext["pokerHandCalculatorState"],
        "numberOfHands" | "strongestHands"
    >,
    shuffleHand: mockShuffleHand,
    deleteHand: mockDeleteHand,
    showHand: mockShowHand,
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
                onClick={() => {
                    if (onClick) onClick();
                }}
            >
                {`${rank}-${suit}-${showing}`}
            </button>
        );
    },
}));

describe("The Street component...", () => {
    afterEach(() => {
        mockShuffleHand.mockRestore();
        mockDeleteHand.mockRestore();
        mockShowHand.mockRestore();

        mockSetSelectingCard.mockRestore();
    });

    test("Should render text identifying the hand's number", () => {
        render(<Hand {...defaultProps} number={203948} />);
        const numberId = screen.getByText(`Hand ${203948}`);
        expect(numberId).toBeInTheDocument();
    });
    test(`Should render a 'check mark' if the 'strongestHands' state from the
       PokerHandCalculator component corresponds to this hand`, () => {
        render(
            <PokerHandCalculatorContext.Provider
                value={
                    mockPokerHandCalculatorContextValue as unknown as IPokerHandCalculatorContext
                }
            >
                <Hand {...defaultProps} />
            </PokerHandCalculatorContext.Provider>,
        );
        const checkmark = screen.getByText("Check");
        expect(checkmark).toBeInTheDocument();
    });
    test(`Should not render a 'check mark' if the 'strongestHands' state from the
       PokerHandCalculator component does not correspond to this hand`, () => {
        render(
            <PokerHandCalculatorContext.Provider
                value={
                    mockPokerHandCalculatorContextValue as unknown as IPokerHandCalculatorContext
                }
            >
                <Hand {...defaultProps} number={100} />
            </PokerHandCalculatorContext.Provider>,
        );
        const checkmark = screen.queryByText("Check");
        expect(checkmark).not.toBeInTheDocument();
    });
    describe("Should display two child Card components...", () => {
        test(`One of which should be passed the first 'info.cards' prop's entry as its 'info' prop`, () => {
            render(<Hand {...defaultProps} />);
            const firstCard = screen.getByRole("button", { name: "A-Heart-false" });
            expect(firstCard).toBeInTheDocument();
        });
        test(`And a 'showing' prop equal to 'true' if the hand is one of the strongest in the 'strongestHands' field in the PokerHandCalculator component's state and the card comprises the best hand`, () => {
            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        {
                            ...mockPokerHandCalculatorContextValue,
                            pokerHandCalculatorState: {
                                ...mockPokerHandCalculatorContextValue.pokerHandCalculatorState,
                                showingHand: defaultProps.number - 1,
                            },
                        } as unknown as IPokerHandCalculatorContext
                    }
                >
                    <SimulateContext.Provider
                        value={mockSimulateContextValue as unknown as ISimulateContext}
                    >
                        <Hand {...defaultProps} />
                    </SimulateContext.Provider>
                </PokerHandCalculatorContext.Provider>,
            );

            const firstCard = screen.getByRole("button", { name: "A-Heart-true" });
            expect(firstCard).toBeInTheDocument();
        });
        test(`And, when clicked, should invoke the 'setSelectingCard' function from the Interactive component's context`, () => {
            render(
                <SimulateContext.Provider
                    value={mockSimulateContextValue as unknown as ISimulateContext}
                >
                    <Hand {...defaultProps} />
                </SimulateContext.Provider>,
            );
            const firstCard = screen.getByRole("button", { name: "A-Heart-false" });
            expect(firstCard).toBeInTheDocument();

            fireEvent.click(firstCard);

            expect(mockSetSelectingCard).toHaveBeenCalledWith(defaultProps.number - 1, 0);
        });
        test(`The other should be passed the second 'info.cards' prop's entry as its 'info' prop`, () => {
            render(<Hand {...defaultProps} />);
            const secondCard = screen.getByRole("button", { name: "2-Heart-false" });
            expect(secondCard).toBeInTheDocument();
        });
        test(`And a 'showing' prop equal to 'true' if the hand is one of the strongest in the 'strongestHands' field in the PokerHandCalculator component's state and the card comprises the best hand`, () => {
            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        {
                            ...mockPokerHandCalculatorContextValue,
                            pokerHandCalculatorState: {
                                ...mockPokerHandCalculatorContextValue.pokerHandCalculatorState,
                                showingHand: defaultProps.number - 1,
                            },
                        } as unknown as IPokerHandCalculatorContext
                    }
                >
                    <SimulateContext.Provider
                        value={mockSimulateContextValue as unknown as ISimulateContext}
                    >
                        <Hand {...defaultProps} />
                    </SimulateContext.Provider>
                </PokerHandCalculatorContext.Provider>,
            );

            const secondCard = screen.getByRole("button", { name: "2-Heart-true" });
            expect(secondCard).toBeInTheDocument();
        });
        test(`The other should be passed the second 'info.cards' prop's entry as its 'info' prop`, () => {
            render(
                <SimulateContext.Provider
                    value={mockSimulateContextValue as unknown as ISimulateContext}
                >
                    <Hand {...defaultProps} />
                </SimulateContext.Provider>,
            );
            const secondCard = screen.getByRole("button", { name: "2-Heart-false" });
            expect(secondCard).toBeInTheDocument();

            fireEvent.click(secondCard);

            expect(mockSetSelectingCard).toHaveBeenCalledWith(defaultProps.number - 1, 1);
        });
    });
    describe("Should display a 'shuffle hand' button...", () => {
        test("With the text: 'Cycle'", () => {
            render(<Hand {...defaultProps} />);
            const shuffleHandButton = screen.getByRole("button", { name: "Cycle" });
            expect(shuffleHandButton).toBeInTheDocument();
        });
        test("That, when clicked, should invoke the 'shuffleHand' function in the PokerHandCalculator component's context", () => {
            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        {
                            ...mockPokerHandCalculatorContextValue,
                            pokerHandCalculatorState: {
                                ...mockPokerHandCalculatorContextValue.pokerHandCalculatorState,
                                numberOfHands: 2,
                            },
                        } as unknown as IPokerHandCalculatorContext
                    }
                >
                    <Hand {...defaultProps} />
                </PokerHandCalculatorContext.Provider>,
            );

            const shuffleHandButton = screen.getByRole("button", { name: "Cycle" });
            expect(shuffleHandButton).toBeInTheDocument();

            fireEvent.click(shuffleHandButton);
            fireEvent.mouseLeave(shuffleHandButton);

            expect(mockShuffleHand).toHaveBeenCalledWith(defaultProps.number - 1);
        });
    });
    describe("Should display a delete button...", () => {
        test("Unless the 'numberOfHands' field in the PokerHandCalculator component's state is below one", () => {
            render(<Hand {...defaultProps} />);
            const deleteHandButton = screen.queryByRole("button", { name: "Delete" });
            expect(deleteHandButton).not.toBeInTheDocument();
        });
        test("With the text: 'Delete'", () => {
            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        {
                            ...mockPokerHandCalculatorContextValue,
                            pokerHandCalculatorState: {
                                ...mockPokerHandCalculatorContextValue.pokerHandCalculatorState,
                                numberOfHands: 2,
                            },
                        } as unknown as IPokerHandCalculatorContext
                    }
                >
                    <Hand {...defaultProps} />
                </PokerHandCalculatorContext.Provider>,
            );

            const deleteHandButton = screen.getByRole("button", { name: "Delete" });
            expect(deleteHandButton).toBeInTheDocument();
        });
        test("That, when clicked, should invoke the 'deleteHand' function in the PokerHandCalculator component's context", () => {
            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        {
                            ...mockPokerHandCalculatorContextValue,
                            pokerHandCalculatorState: {
                                ...mockPokerHandCalculatorContextValue.pokerHandCalculatorState,
                                numberOfHands: 2,
                            },
                        } as unknown as IPokerHandCalculatorContext
                    }
                >
                    <Hand {...defaultProps} />
                </PokerHandCalculatorContext.Provider>,
            );

            const deleteHandButton = screen.getByRole("button", { name: "Delete" });
            expect(deleteHandButton).toBeInTheDocument();

            fireEvent.click(deleteHandButton);
            fireEvent.mouseLeave(deleteHandButton);

            expect(mockDeleteHand).toHaveBeenCalledWith(defaultProps.number - 1);
        });
    });
    describe("Should display a 'show hand' button...", () => {
        test("With the text: 'Visibility' if the 'showingHand' field in the PokerHandCalculator component's state corresponds to this hand", () => {
            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        {
                            ...mockPokerHandCalculatorContextValue,
                            pokerHandCalculatorState: {
                                ...mockPokerHandCalculatorContextValue.pokerHandCalculatorState,
                                showingHand: defaultProps.number - 1,
                            },
                        } as unknown as IPokerHandCalculatorContext
                    }
                >
                    <Hand {...defaultProps} />
                </PokerHandCalculatorContext.Provider>,
            );

            const showHandButton = screen.getByRole("button", { name: "Visibility" });
            expect(showHandButton).toBeInTheDocument();
        });
        test("With the text: 'Visibility_Off' if the 'showingHand' field in the PokerHandCalculator component's state does not correspond to this hand", () => {
            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        mockPokerHandCalculatorContextValue as unknown as IPokerHandCalculatorContext
                    }
                >
                    <Hand {...defaultProps} />
                </PokerHandCalculatorContext.Provider>,
            );

            const showHandButton = screen.getByRole("button", { name: "Visibility_Off" });
            expect(showHandButton).toBeInTheDocument();
        });
        test("That, when clicked, should invoke the 'showHand' function in the PokerHandCalculator component's context", () => {
            render(
                <PokerHandCalculatorContext.Provider
                    value={
                        mockPokerHandCalculatorContextValue as unknown as IPokerHandCalculatorContext
                    }
                >
                    <Hand {...defaultProps} />
                </PokerHandCalculatorContext.Provider>,
            );

            const showHandButton = screen.getByRole("button", { name: "Visibility_Off" });
            expect(showHandButton).toBeInTheDocument();

            fireEvent.click(showHandButton);
            fireEvent.mouseLeave(showHandButton);

            expect(mockShowHand).toHaveBeenCalledWith(defaultProps.number - 1);
        });
    });
});
