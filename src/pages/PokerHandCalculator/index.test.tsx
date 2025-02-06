import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";
import {
    Card,
    Deck,
    Hand,
    createHand,
    pickCards,
    insertCards,
} from "@/features/Deck/utils/deckFuncs";
import * as deckFuncs from "@/features/Deck/utils/deckFuncs";
import { PokerHandCalculator, IPokerHandCalculatorContext, PokerHandCalculatorContext } from ".";

// Mock deck
function newDeck() {
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

const renderFunc = () => {
    let PokerHandCalculatorContextValue!: IPokerHandCalculatorContext;

    const component = (
        <PokerHandCalculator>
            <PokerHandCalculatorContext.Consumer>
                {(value) => {
                    PokerHandCalculatorContextValue = value;
                    return null;
                }}
            </PokerHandCalculatorContext.Consumer>
        </PokerHandCalculator>
    );

    const { rerender } = render(component);

    const getContextValue = () => PokerHandCalculatorContextValue;

    return {
        rerender,
        getContextValue,
    };
};

// Mock dependencies
let mockDimensions = [800, 600];
vi.mock("@/hooks/useResizeObserverElement", () => ({
    useResizeObserverElement: vi.fn(() => [mockDimensions]),
}));
function updateMockDimensions(width: number, height: number) {
    mockDimensions = [width, height];
}

vi.mock("@/features/Deck/utils/deckFuncs", () => {
    return {
        createDeck: vi.fn(() => newDeck()),
        createHand: vi.fn((deck: Deck): { hand: Hand; deck: Deck } => {
            const cards: [Card, Card] = [
                deck.splice(Math.floor(Math.random() * deck.length), 1)[0] as Card,
                deck.splice(Math.floor(Math.random() * deck.length), 1)[0] as Card,
            ];
            return {
                hand: {
                    cards,
                    strength: { value: 0, cards: [], rank: "High Card", information: "" },
                },
                deck,
            };
        }),
        pickCard: vi.fn((deck: Deck): { card: Card; deck: Deck } => {
            const card = deck.pop() as Card;
            return { card, deck };
        }),
        pickCards: vi.fn((deck: Deck, quantity: number): { cards: Card[]; deck: Deck } => {
            const mutableDeck = [...deck];
            const cards = [];

            const cardsToAdd = Math.min(quantity, deck.length);
            for (let i = 0; i < cardsToAdd; i++) {
                const index = Math.floor(Math.random() * mutableDeck.length);
                const card = mutableDeck[index];
                mutableDeck.splice(index, 1);
                cards.push(card);
            }

            return { cards, deck: mutableDeck };
        }),
        insertCards: vi.fn((deck: Deck, cards: Card[]): Deck => {
            cards.forEach((card) => deck.push(card));
            return deck;
        }),
        calculateHandStrength: vi.fn(() => ({})),
        findStrongestHands: vi.fn(() => []),
    };
});
vi.mock("@/components/structural/components/TabSelector", () => ({
    TabSelector: () => <div>Tab Selector</div>,
}));
vi.mock("@/features/About", () => ({ About: () => <div>About</div> }));
vi.mock("@/features/Design", () => ({ Design: () => <div>Design</div> }));
vi.mock("@/features/HandRankings", () => ({ HandRankings: () => <div>Hand Rankings</div> }));
vi.mock("@/features/Simulate", () => ({ Simulate: () => <div>Simulate</div> }));

describe("The PokerHandCalculator component...", () => {
    beforeEach(async () => {
        vi.spyOn(global.Math, "random");
    });

    afterEach(() => {
        (createHand as jest.Mock).mockRestore();
        (pickCards as jest.Mock).mockRestore();
        (insertCards as jest.Mock).mockRestore();

        (global.Math.random as jest.Mock).mockRestore();
    });

    test("Should render correctly", () => {
        renderFunc();

        const component = screen.getByRole("heading", { name: "Poker Hand Calculator" });
        expect(component).toBeInTheDocument();
    });

    describe("Should pass context to its descendant components...", () => {
        test("Including the application state", async () => {
            const { getContextValue } = renderFunc();
            const { pokerHandCalculatorState } = getContextValue();

            expect(pokerHandCalculatorState).toBeDefined();
            expect(pokerHandCalculatorState.boardStage).toBe("pre-flop");
            expect(pokerHandCalculatorState.numberOfHands).toBe(1);
        });

        test("Including a setter function for updating the application state", async () => {
            const { getContextValue } = renderFunc();
            const { setPokerHandCalculatorStateProperty } = getContextValue();

            await act(async () => {
                setPokerHandCalculatorStateProperty("boardStage", "flop");
            });

            expect(getContextValue().pokerHandCalculatorState.boardStage).toBe("flop");
        });

        describe("Including the 'swapCard' function...", () => {
            test("Which should swap a card in the defined hand to the specified card if the 'handIndex' argument is greater than or equal to 0", async () => {
                const { getContextValue } = renderFunc();
                const { pokerHandCalculatorState, swapCard } = getContextValue();

                const handBefore = structuredClone(pokerHandCalculatorState.currentHands[0]);

                await act(async () => swapCard(0, 1, 0));

                const handAfter = structuredClone(
                    getContextValue().pokerHandCalculatorState.currentHands[0],
                );

                expect(handBefore.cards[1]).not.toStrictEqual(handAfter.cards[1]);
            });
            test("Or swap a card on the board to the specified card if the 'handIndex' argument is lower than 0", async () => {
                const { getContextValue } = renderFunc();
                const { pokerHandCalculatorState, setPokerHandCalculatorStateProperty } =
                    getContextValue();

                await act(async () => setPokerHandCalculatorStateProperty("boardStage", "flop"));

                const boardBefore = structuredClone(pokerHandCalculatorState.board);

                await act(async () => getContextValue().swapCard(-1, 2, 0));

                const boardAfter = structuredClone(
                    getContextValue().pokerHandCalculatorState.board,
                );

                expect(boardBefore[2]).not.toStrictEqual(boardAfter[2]);
            });
            test("Unless the provided 'handIndex' argument is larger than or equal to the length of the 'currentHands' state array when swapping a card in a hand", async () => {
                const { getContextValue } = renderFunc();

                const handBefore = structuredClone(
                    getContextValue().pokerHandCalculatorState.currentHands[0],
                );

                await act(async () => getContextValue().swapCard(1, 1, 0));

                const handAfter = structuredClone(
                    getContextValue().pokerHandCalculatorState.currentHands[0],
                );

                expect(handBefore.cards[1]).toStrictEqual(handAfter.cards[1]);
            });
            test("Or the provided 'cardIndex' argument is lower than 0 when swapping a card in a hand", async () => {
                const { getContextValue } = renderFunc();
                const { pokerHandCalculatorState, swapCard } = getContextValue();

                const handBefore = structuredClone(pokerHandCalculatorState.currentHands[0]);

                await act(async () => swapCard(0, -1, 0));

                const handAfter = structuredClone(
                    getContextValue().pokerHandCalculatorState.currentHands[0],
                );

                expect(handBefore.cards[1]).toStrictEqual(handAfter.cards[1]);
            });
            test("Or the provided 'cardIndex' argument is greater than the number of cards in the hand when swapping a card in a hand", async () => {
                const { getContextValue } = renderFunc();
                const { pokerHandCalculatorState, swapCard } = getContextValue();

                const handBefore = structuredClone(pokerHandCalculatorState.currentHands[0]);

                await act(async () => swapCard(0, 2, 0));

                const handAfter = structuredClone(pokerHandCalculatorState.currentHands[0]);

                expect(handBefore.cards[1]).toStrictEqual(handAfter.cards[1]);
            });
            test("Unless the provided 'cardIndex' argument is lower than 0 when swapping a card on the board", async () => {
                const { getContextValue } = renderFunc();
                const { pokerHandCalculatorState, swapCard } = getContextValue();

                const handBefore = structuredClone(pokerHandCalculatorState.currentHands[0]);

                await act(async () => swapCard(-1, -1, 0));

                const handAfter = structuredClone(
                    getContextValue().pokerHandCalculatorState.currentHands[0],
                );

                expect(handBefore.cards[1]).toStrictEqual(handAfter.cards[1]);
            });
            test("Or the provided 'cardIndex' argument is greater than the number of cards on the board when swapping a card on the board", async () => {
                const { getContextValue } = renderFunc();
                const { pokerHandCalculatorState, swapCard } = getContextValue();

                const handBefore = structuredClone(pokerHandCalculatorState.currentHands[0]);

                await act(async () => swapCard(-1, 5, 0));

                const handAfter = structuredClone(
                    getContextValue().pokerHandCalculatorState.currentHands[0],
                );

                expect(handBefore.cards[1]).toStrictEqual(handAfter.cards[1]);
            });
            test("Or if the result of the 'pickCard' function is invalid when swapping a card in a hand or on the board", async () => {
                const { getContextValue } = renderFunc();
                const { pokerHandCalculatorState, swapCard } = getContextValue();

                const handBefore = structuredClone(pokerHandCalculatorState.currentHands[0]);

                vi.spyOn(deckFuncs, "pickCard").mockImplementationOnce(() => null);

                await act(async () => swapCard(0, 1, 0));

                const handAfter = structuredClone(
                    getContextValue().pokerHandCalculatorState.currentHands[0],
                );

                expect(handBefore.cards[1]).toStrictEqual(handAfter.cards[1]);
            });
        });

        describe("Including the 'deleteHand' function...", () => {
            test("Which should delete an existing hand", async () => {
                const { getContextValue } = renderFunc();
                const { setPokerHandCalculatorStateProperty } = getContextValue();

                await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 5));

                const currentHandsOld = structuredClone(
                    getContextValue().pokerHandCalculatorState.currentHands,
                );
                const handToDelete = 2;

                await act(async () => getContextValue().deleteHand(handToDelete));

                const currentHandsNew = structuredClone(
                    getContextValue().pokerHandCalculatorState.currentHands,
                );

                expect(currentHandsNew.length).toBe(currentHandsOld.length - 1);
                currentHandsOld.splice(handToDelete, 1);
                expect(currentHandsNew).toStrictEqual(currentHandsOld);
            });
            test("Unless the provided 'index' argument is less than 0", async () => {
                const { getContextValue } = renderFunc();
                const { setPokerHandCalculatorStateProperty } = getContextValue();

                await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 5));

                const currentHandsOld = structuredClone(
                    getContextValue().pokerHandCalculatorState.currentHands,
                );

                await act(async () => getContextValue().deleteHand(-1));

                const currentHandsNew = structuredClone(
                    getContextValue().pokerHandCalculatorState.currentHands,
                );

                expect(currentHandsNew.length).toBe(currentHandsOld.length);
                expect(currentHandsNew).toStrictEqual(currentHandsOld);
            });
            test("Or the provided 'index' argument is larger than or equal to the length of the 'currentHands' state array", async () => {
                const { getContextValue } = renderFunc();
                const { setPokerHandCalculatorStateProperty } = getContextValue();

                await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 5));

                const currentHandsOld = structuredClone(
                    getContextValue().pokerHandCalculatorState.currentHands,
                );

                await act(async () =>
                    getContextValue().deleteHand(
                        getContextValue().pokerHandCalculatorState.currentHands.length,
                    ),
                );

                const currentHandsNew = structuredClone(
                    getContextValue().pokerHandCalculatorState.currentHands,
                );

                expect(currentHandsNew.length).toBe(currentHandsOld.length);
                expect(currentHandsNew).toStrictEqual(currentHandsOld);
            });
            test("Or the length of the 'currentHands' state array is equal to 1", async () => {
                const { getContextValue } = renderFunc();
                const { setPokerHandCalculatorStateProperty } = getContextValue();

                await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 1));

                const currentHandsOld = structuredClone(
                    getContextValue().pokerHandCalculatorState.currentHands,
                );

                await act(async () => getContextValue().deleteHand(0));

                const currentHandsNew = structuredClone(
                    getContextValue().pokerHandCalculatorState.currentHands,
                );

                expect(currentHandsNew.length).toBe(currentHandsOld.length);
                expect(currentHandsNew).toStrictEqual(currentHandsOld);
            });
            test("And should decrease the 'showingHand' state value by 1 if it exceeds the value of the provided 'index' argument", async () => {
                const { getContextValue } = renderFunc();
                const { setPokerHandCalculatorStateProperty } = getContextValue();

                await act(async () => setPokerHandCalculatorStateProperty("showingHand", 3));
                await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 5));

                expect(getContextValue().pokerHandCalculatorState.showingHand).toBe(3);

                await act(async () => getContextValue().deleteHand(0));

                expect(getContextValue().pokerHandCalculatorState.showingHand).toBe(2);
            });
            test("And should set the 'showingHand' state value to -1 if it matches the value of the provided 'index' argument", async () => {
                const { getContextValue } = renderFunc();
                const { setPokerHandCalculatorStateProperty } = getContextValue();

                await act(async () => setPokerHandCalculatorStateProperty("showingHand", 0));
                await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 5));

                expect(getContextValue().pokerHandCalculatorState.showingHand).toBe(0);

                await act(async () => getContextValue().deleteHand(0));

                expect(getContextValue().pokerHandCalculatorState.showingHand).toBe(-1);
            });
        });

        describe("Including the 'shuffleHand' function...", () => {
            test("Which should shuffle a hand's cards", async () => {
                const { getContextValue } = renderFunc();
                let { currentDeck } = structuredClone(getContextValue().pokerHandCalculatorState);
                const { currentHands } = structuredClone(
                    getContextValue().pokerHandCalculatorState,
                );

                (global.Math.random as jest.Mock)
                    .mockReturnValueOnce(0.01)
                    .mockReturnValueOnce(0.01);

                await act(async () => getContextValue().shuffleHand(0));

                expect(
                    getContextValue().pokerHandCalculatorState.currentHands[0].cards,
                ).toStrictEqual([currentDeck[0], currentDeck[1]]);

                currentDeck.splice(0, 2);
                currentDeck = currentDeck.concat(currentHands[0].cards);
                expect(getContextValue().pokerHandCalculatorState.currentDeck).toStrictEqual(
                    currentDeck,
                );
            });
            test("Unless the provided 'index' argument is less than 0", async () => {
                const { getContextValue } = renderFunc();
                const { currentDeck } = structuredClone(getContextValue().pokerHandCalculatorState);
                const { currentHands } = structuredClone(
                    getContextValue().pokerHandCalculatorState,
                );

                await act(async () => getContextValue().shuffleHand(-1));

                expect(getContextValue().pokerHandCalculatorState.currentDeck).toStrictEqual(
                    currentDeck,
                );
                expect(getContextValue().pokerHandCalculatorState.currentHands).toStrictEqual(
                    currentHands,
                );
            });
            test("Or the provided 'index' argument is larger than or equal to the length of the 'currentHands' state array", async () => {
                const { getContextValue } = renderFunc();
                const { currentDeck } = structuredClone(getContextValue().pokerHandCalculatorState);
                const { currentHands } = structuredClone(
                    getContextValue().pokerHandCalculatorState,
                );

                await act(async () => getContextValue().shuffleHand(1));

                expect(getContextValue().pokerHandCalculatorState.currentDeck).toStrictEqual(
                    currentDeck,
                );
                expect(getContextValue().pokerHandCalculatorState.currentHands).toStrictEqual(
                    currentHands,
                );
            });
        });

        describe("Including the 'showHand' function", () => {
            test("Which should change the hand being shown (or toggle the current one off)", async () => {
                const { getContextValue } = renderFunc();
                const { setPokerHandCalculatorStateProperty } = getContextValue();

                await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 5));

                expect(getContextValue().pokerHandCalculatorState.showingHand).toBe(-1); // Should be off by default

                await act(async () => getContextValue().showHand(2));

                expect(getContextValue().pokerHandCalculatorState.showingHand).toBe(2);

                await act(async () => getContextValue().showHand(2)); // Toggle off

                expect(getContextValue().pokerHandCalculatorState.showingHand).toBe(-1);
            });
        });

        describe("Including the 'shuffleBoard' function...", () => {
            test("Which should shuffle all the cards on the board", async () => {
                const { getContextValue } = renderFunc();
                const { setPokerHandCalculatorStateProperty } = getContextValue();
                const { currentDeck } = structuredClone(getContextValue().pokerHandCalculatorState);

                (global.Math.random as jest.Mock) // Picking cards for board
                    .mockReturnValueOnce(0.99)
                    .mockReturnValueOnce(0.99)
                    .mockReturnValueOnce(0.99);

                await act(async () => setPokerHandCalculatorStateProperty("boardStage", "flop"));

                (global.Math.random as jest.Mock) // Shuffling cards for board
                    .mockReturnValueOnce(0.001)
                    .mockReturnValueOnce(0.001)
                    .mockReturnValueOnce(0.001);

                await act(async () => getContextValue().shuffleBoard());

                expect(getContextValue().pokerHandCalculatorState.board).toStrictEqual([
                    currentDeck[0],
                    currentDeck[1],
                    currentDeck[2],
                ]);
            });
        });

        describe("Which, when consumed by a component other than the PokerHandCalculator component, should contain the same state, state setter and functions...", () => {
            test("But none of those functions should do anything when invoked, and should exit gracefully", async () => {
                let PokerHandCalculatorContextValue!: IPokerHandCalculatorContext;

                render(
                    <div>
                        <PokerHandCalculatorContext.Consumer>
                            {(value) => {
                                PokerHandCalculatorContextValue = value;
                                return null;
                            }}
                        </PokerHandCalculatorContext.Consumer>
                    </div>,
                );

                expect(PokerHandCalculatorContextValue).toBeDefined();

                const {
                    pokerHandCalculatorState,
                    setPokerHandCalculatorStateProperty,

                    swapCard,
                    shuffleHand,
                    deleteHand,
                    showHand,
                    shuffleBoard,
                } = PokerHandCalculatorContextValue;

                expect(pokerHandCalculatorState).toBeDefined();
                expect(() =>
                    setPokerHandCalculatorStateProperty("boardStage", "flop"),
                ).not.toThrow();

                expect(() => swapCard(0, 1, 0)).not.toThrow();
                expect(() => shuffleHand(0)).not.toThrow();
                expect(() => deleteHand(0)).not.toThrow();
                expect(() => showHand(0)).not.toThrow();
                expect(() => shuffleBoard()).not.toThrow();
            });
        });
    });

    test("Should change the number of hands when the 'numberOfHands' state is changed", async () => {
        const { getContextValue } = renderFunc();

        expect(getContextValue().pokerHandCalculatorState.currentHands.length).toBe(1);
        await act(async () =>
            getContextValue().setPokerHandCalculatorStateProperty("numberOfHands", 4),
        );
        expect(getContextValue().pokerHandCalculatorState.currentHands.length).toBe(4);
        await act(async () =>
            getContextValue().setPokerHandCalculatorStateProperty("numberOfHands", 6),
        );
        expect(getContextValue().pokerHandCalculatorState.currentHands.length).toBe(6);
        await act(async () =>
            getContextValue().setPokerHandCalculatorStateProperty("numberOfHands", 2),
        );
        expect(getContextValue().pokerHandCalculatorState.currentHands.length).toBe(2);
    });

    test("Should change the number of cards on the board when the 'boardStage' state is changed", async () => {
        const { getContextValue } = renderFunc();

        expect(getContextValue().pokerHandCalculatorState.board.length).toBe(0);
        await act(async () =>
            getContextValue().setPokerHandCalculatorStateProperty("boardStage", "flop"),
        );
        expect(getContextValue().pokerHandCalculatorState.board.length).toBe(3);
        await act(async () =>
            getContextValue().setPokerHandCalculatorStateProperty("boardStage", "turn"),
        );
        expect(getContextValue().pokerHandCalculatorState.board.length).toBe(4);
        await act(async () =>
            getContextValue().setPokerHandCalculatorStateProperty("boardStage", "river"),
        );
        expect(getContextValue().pokerHandCalculatorState.board.length).toBe(5);
        await act(async () =>
            getContextValue().setPokerHandCalculatorStateProperty("boardStage", "pre-flop"),
        );
        expect(getContextValue().pokerHandCalculatorState.board.length).toBe(0);
    });

    test("Should have a 'wide' layout when the container element's size exceeds or is equal to 800px, and should display two TabSelector components", async () => {
        const { getContextValue } = renderFunc();
        const { pokerHandCalculatorState } = getContextValue();

        expect(screen.queryAllByText("Tab Selector")).toHaveLength(2);
        expect(pokerHandCalculatorState.layout).toBe("wide");
    });
    test("Should have a 'thin' layout when the container element's size is lower than 800px, and should display one TabSelector component", async () => {
        const { getContextValue, rerender } = renderFunc();
        const { pokerHandCalculatorState } = getContextValue();

        expect(screen.queryAllByText("Tab Selector")).toHaveLength(2);
        expect(pokerHandCalculatorState.layout).toBe("wide");

        let newPokerHandCalculatorContextValue!: IPokerHandCalculatorContext;

        updateMockDimensions(799, 600);
        rerender(
            <PokerHandCalculator>
                <PokerHandCalculatorContext.Consumer>
                    {(value) => {
                        newPokerHandCalculatorContextValue = value;
                        return null;
                    }}
                </PokerHandCalculatorContext.Consumer>
            </PokerHandCalculator>,
        );

        expect(screen.queryAllByText("Tab Selector")).toHaveLength(1);
        expect(newPokerHandCalculatorContextValue.pokerHandCalculatorState.layout).toBe("thin");
    });
});
