import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";
import { PokerHandCalculator, IPokerHandCalculatorContext, PokerHandCalculatorContext } from ".";

const renderComponent = () => render(<PokerHandCalculator />);

// Mock dependencies
vi.mock("@/hooks/useResizeObserverElement", () => ({
    default: vi.fn(() => [[800, 600]]),
}));
vi.mock("@/features/Deck/utils/deckFuncs", () => {
    return {
        createDeck: () => [],
        createHand: () => ({ hand: { cards: [], strength: {} }, deck: [] }),
        pickCard: () => ({ card: {}, deck: [] }),
        pickCards: () => ({ cards: [], deck: [] }),
        calculateHandStrength: () => ({}),
        findStrongestHands: () => [],
    };
});
vi.mock("@/features/About", () => ({ About: () => <div>About</div> }));
vi.mock("@/features/Design", () => ({ Design: () => <div>Design</div> }));
vi.mock("@/features/HandRankings", () => ({ HandRankings: () => <div>Hand Rankings</div> }));
vi.mock("@/features/Simulate", () => ({ Simulate: () => <div>Simulate</div> }));

describe("The PokerHandCalculator component...", () => {
    test("Should render correctly", () => {
        renderComponent();
        const component = screen.getByRole("heading", { name: "Poker Hand Calculator" });
        expect(component).toBeInTheDocument();
    });

    describe("Should pass context to its descendant components...", () => {
        let contextValue: IPokerHandCalculatorContext;

        beforeEach(async () => {
            render(
                <PokerHandCalculator>
                    <PokerHandCalculatorContext.Consumer>
                        {(value) => {
                            contextValue = value;
                            return null;
                        }}
                    </PokerHandCalculatorContext.Consumer>
                </PokerHandCalculator>,
            );
        });

        test("Including the application state", async () => {
            expect(contextValue.pokerHandCalculatorState).toBeDefined();
            expect(contextValue.pokerHandCalculatorState.boardStage).toBe("pre-flop");
            expect(contextValue.pokerHandCalculatorState.numberOfHands).toBe(1);
        });

        test("Including a setter function for updating the application state", async () => {
            const { setPokerHandCalculatorStateProperty } = contextValue;

            await act(async () => {
                setPokerHandCalculatorStateProperty("boardStage", "flop");
            });

            expect(contextValue.pokerHandCalculatorState.boardStage).toBe("flop");
        });
    });
});
