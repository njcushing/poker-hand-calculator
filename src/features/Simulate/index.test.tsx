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

type renderFuncArgs = {
    PokerHandCalculatorContextOverride?: IPokerHandCalculatorContext;
};
const renderFunc = (args: renderFuncArgs = {}) => {
    const { PokerHandCalculatorContextOverride } = args;

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
            <Simulate>
                <SimulateContext.Consumer>
                    {(value) => {
                        SimulateContextValue = value;
                        return null;
                    }}
                </SimulateContext.Consumer>
            </Simulate>
        </PokerHandCalculatorContext.Provider>,
    );

    const getContextValue = () => ({
        PokerHandCalculatorContextValue,
        SimulateContextValue,
    });

    return { rerender, getContextValue };
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
    describe("Should pass context to its descendant components...", () => {
        test("Including a 'selectingCard' field which should be 'null' by default", async () => {
            const { getContextValue } = renderFunc();
            const { SimulateContextValue } = getContextValue();
            const { selectingCard } = SimulateContextValue;

            expect(selectingCard).toBeNull();
        });

        describe("Including a setter function for updating the 'selectingCard' field...", () => {
            test("Which should set the value as expected", async () => {
                const { getContextValue } = renderFunc();
                const { SimulateContextValue } = getContextValue();
                const { setSelectingCard } = SimulateContextValue;

                await act(async () => setSelectingCard(0, 0));

                expect(getContextValue().SimulateContextValue.selectingCard).toStrictEqual([0, 0]);
            });
            test("Unless the provided arguments match the existing 'selectingCard' state, in which case 'selectingCard' should be set to 'null'", async () => {
                const { getContextValue } = renderFunc();
                const { SimulateContextValue } = getContextValue();
                const { setSelectingCard } = SimulateContextValue;

                await act(async () => setSelectingCard(0, 0));

                expect(getContextValue().SimulateContextValue.selectingCard).toStrictEqual([0, 0]);

                await act(async () => {
                    getContextValue().SimulateContextValue.setSelectingCard(0, 0);
                });

                expect(getContextValue().SimulateContextValue.selectingCard).toBeNull();
            });
        });

        describe("Which, when consumed by a component other than the SimulateContext component, should contain the same context...", () => {
            test("But any functions within the context should do nothing when invoked, and should exit gracefully", async () => {
                let SimulateContextValue!: ISimulateContext;

                render(
                    <PokerHandCalculatorContext.Provider
                        value={
                            mockPokerHandCalculatorContextValue as unknown as IPokerHandCalculatorContext
                        }
                    >
                        <div>
                            <SimulateContext.Consumer>
                                {(value) => {
                                    SimulateContextValue = value;
                                    return null;
                                }}
                            </SimulateContext.Consumer>
                        </div>
                    </PokerHandCalculatorContext.Provider>,
                );

                expect(SimulateContextValue).toBeDefined();

                const { selectingCard, setSelectingCard } = SimulateContextValue;

                expect(selectingCard).toBeDefined();
                expect(() => setSelectingCard(0, 0)).not.toThrow();
            });
        });
    });

    describe("Should render child Card components...", () => {
        test("The quantity of which is defined by how many entries are in the 'currentHands' field in the PokerHandCalculator component's state", () => {
            renderFunc();

            const handComponents = screen.getAllByLabelText("hand");
            expect(handComponents).toHaveLength(3);
        });
        test("And an incrementing integer for its 'number' prop, starting at 1", () => {
            renderFunc();

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
            renderFunc();

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
        renderFunc();

        const cardSelection = screen.queryByLabelText("card-selection");
        expect(cardSelection).not.toBeInTheDocument();
    });
    test("Should render the CardSelection component if the 'selectingCard' state is not equal to 'null'", async () => {
        const { getContextValue } = renderFunc();
        const { SimulateContextValue } = getContextValue();
        const { setSelectingCard } = SimulateContextValue;

        await act(async () => setSelectingCard(0, 0));

        const cardSelection = screen.getByLabelText("card-selection");
        expect(cardSelection).toBeInTheDocument();
    });
    test("Should render the Board component", async () => {
        renderFunc();

        const board = screen.getByLabelText("board");
        expect(board).toBeInTheDocument();
    });
});
