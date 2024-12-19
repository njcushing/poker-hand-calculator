import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";
import {
    IPokerHandCalculatorContext,
    PokerHandCalculatorContext,
} from "@/pages/PokerHandCalculator";
import { RecursivePartial } from "@/utils/types";
import { Card, Hand as HandTypes } from "@/features/Deck/utils/deckFuncs";
import { Simulate, ISimulateContext, SimulateContext } from ".";
import { THand } from "./components/Hand";

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
    {
        rank: "6",
        suit: "Heart",
        value: 5,
        order: 6,
    },
] as Card[];
const hands: HandTypes[] = [
    {
        cards: [cards[0], cards[1]],
        strength: {
            value: 0,
            cards: [cards[0], cards[1]],
            rank: "High Card",
            information: "",
        },
    },
    {
        cards: [cards[2], cards[3]],
        strength: {
            value: 0,
            cards: [cards[2], cards[3]],
            rank: "High Card",
            information: "",
        },
    },
    {
        cards: [cards[4], cards[5]],
        strength: {
            value: 0,
            cards: [cards[4], cards[5]],
            rank: "High Card",
            information: "",
        },
    },
];

const mockPokerHandCalculatorContextValue: RecursivePartial<IPokerHandCalculatorContext> = {
    pokerHandCalculatorState: { currentHands: [...hands] },
};

vi.mock("@/features/Simulate/components/Hand", () => ({
    Hand: (props: THand) => {
        const { info, number } = props;
        return (
            <div aria-label="hand">
                {`hand-${number}`}
                <button type="button" aria-label="card">
                    {`${info.cards[0].rank}-${info.cards[0].suit}`}
                </button>
                <button type="button" aria-label="card">
                    {`${info.cards[1].rank}-${info.cards[1].suit}`}
                </button>
            </div>
        );
    },
}));

vi.mock("@/features/Simulate/components/CardSelection", () => ({
    CardSelection: () => <div aria-label="card-selection"></div>,
}));

vi.mock("@/features/Simulate/components/Board", () => ({
    Board: () => <div aria-label="board"></div>,
}));

describe("The Simulate component...", () => {
    let contextValue: ISimulateContext;

    beforeEach(() => {
        render(
            <PokerHandCalculatorContext.Provider
                value={
                    mockPokerHandCalculatorContextValue as unknown as IPokerHandCalculatorContext
                }
            >
                <Simulate>
                    <SimulateContext.Consumer>
                        {(value) => {
                            contextValue = value;
                            return null;
                        }}
                    </SimulateContext.Consumer>
                </Simulate>
            </PokerHandCalculatorContext.Provider>,
        );
    });

    describe("Should pass context to its descendant components...", () => {
        test("Including a 'selectingCard' field which should be 'null' by default", async () => {
            expect(contextValue.selectingCard).toBeNull();
        });

        describe("Including a setter function for updating the 'selectingCard' field...", () => {
            test("Which should set the value as expected", async () => {
                const { setSelectingCard } = contextValue;

                await act(async () => setSelectingCard(0, 0));

                expect(contextValue.selectingCard).toStrictEqual([0, 0]);
            });
            test("Unless the provided arguments match the existing 'selectingCard' state, in which case 'selectingCard' should be set to 'null'", async () => {
                const { setSelectingCard } = contextValue;

                await act(async () => setSelectingCard(0, 0));

                expect(contextValue.selectingCard).toStrictEqual([0, 0]);

                await act(async () => setSelectingCard(0, 0));

                expect(contextValue.selectingCard).toBeNull();
            });
        });
    });

    describe("Should render child Card components...", () => {
        test("The quantity of which is defined by how many entries are in the 'currentHands' field in the PokerHandCalculator component's state", () => {
            const handComponents = screen.getAllByLabelText("hand");
            expect(handComponents).toHaveLength(3);
        });
        test("And an incrementing integer for its 'number' prop, starting at 1", () => {
            let handComponents = screen.getAllByLabelText("hand");
            expect(handComponents).toHaveLength(3);

            handComponents = [
                screen.getByText("hand-1"),
                screen.getByText("hand-2"),
                screen.getByText("hand-3"),
            ];
            handComponents.forEach((handComponent) => expect(handComponent).toBeInTheDocument());
        });
        test("And each hand should be passed the correct value for its 'info' prop", () => {
            let handComponents = screen.getAllByLabelText("hand");
            expect(handComponents).toHaveLength(3);

            handComponents = [
                screen.getByText("hand-1"),
                screen.getByText("hand-2"),
                screen.getByText("hand-3"),
            ];
            handComponents.forEach((handComponent) => expect(handComponent).toBeInTheDocument());

            let cardComponents = screen.getAllByLabelText("card");
            expect(cardComponents).toHaveLength(6);

            cardComponents = [
                screen.getByText("A-Heart"),
                screen.getByText("2-Heart"),
                screen.getByText("3-Heart"),
                screen.getByText("4-Heart"),
                screen.getByText("5-Heart"),
                screen.getByText("6-Heart"),
            ];
            cardComponents.forEach((cardComponent) => expect(cardComponent).toBeInTheDocument());

            expect(handComponents[0]).toContainElement(cardComponents[0]);
            expect(handComponents[0]).toContainElement(cardComponents[1]);

            expect(handComponents[1]).toContainElement(cardComponents[2]);
            expect(handComponents[1]).toContainElement(cardComponents[3]);

            expect(handComponents[2]).toContainElement(cardComponents[4]);
            expect(handComponents[2]).toContainElement(cardComponents[5]);
        });
    });

    test("Should not render the CardSelection component if the 'selectingCard' state is equal to 'null'", async () => {
        const cardSelection = screen.queryByLabelText("card-selection");
        expect(cardSelection).not.toBeInTheDocument();
    });
    test("Should render the CardSelection component if the 'selectingCard' state is not equal to 'null'", async () => {
        const { setSelectingCard } = contextValue;

        await act(async () => setSelectingCard(0, 0));

        const cardSelection = screen.getByLabelText("card-selection");
        expect(cardSelection).toBeInTheDocument();
    });
    test("Should render the Board component", async () => {
        const board = screen.getByLabelText("board");
        expect(board).toBeInTheDocument();
    });
});
