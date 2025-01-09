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
    let rerenderFunc: (ui: React.ReactNode) => void;
    let contextValue: IPokerHandCalculatorContext;

    beforeEach(async () => {
        const { rerender } = render(
            <PokerHandCalculator>
                <PokerHandCalculatorContext.Consumer>
                    {(value) => {
                        contextValue = value;
                        return null;
                    }}
                </PokerHandCalculatorContext.Consumer>
            </PokerHandCalculator>,
        );
        rerenderFunc = rerender;

        vi.spyOn(global.Math, "random");
    });

    afterEach(() => {
        (createHand as jest.Mock).mockRestore();
        (pickCards as jest.Mock).mockRestore();
        (insertCards as jest.Mock).mockRestore();

        (global.Math.random as jest.Mock).mockRestore();
    });

    test("Should render correctly", () => {
        const component = screen.getByRole("heading", { name: "Poker Hand Calculator" });
        expect(component).toBeInTheDocument();
    });

    describe("Should pass context to its descendant components...", () => {
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

        describe("Including the 'swapCard' function...", () => {
            test("Which should swap a card in the defined hand to the specified card if the 'handIndex' argument is greater than or equal to 0", async () => {
                const { pokerHandCalculatorState, swapCard } = contextValue;

                const handBefore = structuredClone(pokerHandCalculatorState.currentHands[0]);

                await act(async () => swapCard(0, 1, 0));

                const handAfter = structuredClone(pokerHandCalculatorState.currentHands[0]);

                expect(handBefore.cards[1]).not.toStrictEqual(handAfter.cards[1]);
            });
            test("Or swap a card on the board to the specified card if the 'handIndex' argument is lower than 0", async () => {
                const { setPokerHandCalculatorStateProperty } = contextValue;

                await act(async () => setPokerHandCalculatorStateProperty("boardStage", "flop"));

                const boardBefore = structuredClone(contextValue.pokerHandCalculatorState.board);

                await act(async () => contextValue.swapCard(-1, 2, 0));

                const boardAfter = structuredClone(contextValue.pokerHandCalculatorState.board);

                expect(boardBefore[2]).not.toStrictEqual(boardAfter[2]);
            });
            test("Unless the provided 'handIndex' argument is larger than or equal to the length of the 'currentHands' state array when swapping a card in a hand", async () => {
                const { pokerHandCalculatorState, swapCard } = contextValue;

                const handBefore = structuredClone(pokerHandCalculatorState.currentHands[0]);

                await act(async () => swapCard(1, 1, 0));

                const handAfter = structuredClone(pokerHandCalculatorState.currentHands[0]);

                expect(handBefore.cards[1]).toStrictEqual(handAfter.cards[1]);
            });
            test("Or the provided 'cardIndex' argument is lower than 0 when swapping a card in a hand", async () => {
                const { pokerHandCalculatorState, swapCard } = contextValue;

                const handBefore = structuredClone(pokerHandCalculatorState.currentHands[0]);

                await act(async () => swapCard(0, -1, 0));

                const handAfter = structuredClone(pokerHandCalculatorState.currentHands[0]);

                expect(handBefore.cards[1]).toStrictEqual(handAfter.cards[1]);
            });
            test("Or the provided 'cardIndex' argument is greater than the number of cards in the hand when swapping a card in a hand", async () => {
                const { pokerHandCalculatorState, swapCard } = contextValue;

                const handBefore = structuredClone(pokerHandCalculatorState.currentHands[0]);

                await act(async () => swapCard(0, 2, 0));

                const handAfter = structuredClone(pokerHandCalculatorState.currentHands[0]);

                expect(handBefore.cards[1]).toStrictEqual(handAfter.cards[1]);
            });
            test("Unless the provided 'cardIndex' argument is lower than 0 when swapping a card on the board", async () => {
                const { pokerHandCalculatorState } = contextValue;

                const handBefore = structuredClone(pokerHandCalculatorState.currentHands[0]);

                await act(async () => contextValue.swapCard(-1, -1, 0));

                const handAfter = structuredClone(pokerHandCalculatorState.currentHands[0]);

                expect(handBefore.cards[1]).toStrictEqual(handAfter.cards[1]);
            });
            test("Or the provided 'cardIndex' argument is greater than the number of cards on the board when swapping a card on the board", async () => {
                const { pokerHandCalculatorState } = contextValue;

                const handBefore = structuredClone(pokerHandCalculatorState.currentHands[0]);

                await act(async () => contextValue.swapCard(-1, 5, 0));

                const handAfter = structuredClone(pokerHandCalculatorState.currentHands[0]);

                expect(handBefore.cards[1]).toStrictEqual(handAfter.cards[1]);
            });
            test("Or if the result of the 'pickCard' function is invalid when swapping a card in a hand or on the board", async () => {
                const { pokerHandCalculatorState, swapCard } = contextValue;

                const handBefore = structuredClone(pokerHandCalculatorState.currentHands[0]);

                vi.spyOn(deckFuncs, "pickCard").mockImplementationOnce(() => null);

                await act(async () => swapCard(0, 1, 0));

                const handAfter = structuredClone(pokerHandCalculatorState.currentHands[0]);

                expect(handBefore.cards[1]).toStrictEqual(handAfter.cards[1]);
            });
        });

        describe("Including the 'deleteHand' function...", () => {
            test("Which should delete an existing hand", async () => {
                const { setPokerHandCalculatorStateProperty } = contextValue;

                await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 5));

                const currentHandsOld = structuredClone(
                    contextValue.pokerHandCalculatorState.currentHands,
                );
                const handToDelete = 2;

                await act(async () => contextValue.deleteHand(handToDelete));

                const currentHandsNew = structuredClone(
                    contextValue.pokerHandCalculatorState.currentHands,
                );

                expect(currentHandsNew.length).toBe(currentHandsOld.length - 1);
                currentHandsOld.splice(handToDelete, 1);
                expect(currentHandsNew).toStrictEqual(currentHandsOld);
            });
            test("Unless the provided 'index' argument is less than 0", async () => {
                const { setPokerHandCalculatorStateProperty } = contextValue;

                await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 5));

                const currentHandsOld = structuredClone(
                    contextValue.pokerHandCalculatorState.currentHands,
                );

                await act(async () => contextValue.deleteHand(-1));

                const currentHandsNew = structuredClone(
                    contextValue.pokerHandCalculatorState.currentHands,
                );

                expect(currentHandsNew.length).toBe(currentHandsOld.length);
                expect(currentHandsNew).toStrictEqual(currentHandsOld);
            });
            test("Or the provided 'index' argument is larger than or equal to the length of the 'currentHands' state array", async () => {
                const { setPokerHandCalculatorStateProperty } = contextValue;

                await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 5));

                const currentHandsOld = structuredClone(
                    contextValue.pokerHandCalculatorState.currentHands,
                );

                await act(async () =>
                    contextValue.deleteHand(
                        contextValue.pokerHandCalculatorState.currentHands.length,
                    ),
                );

                const currentHandsNew = structuredClone(
                    contextValue.pokerHandCalculatorState.currentHands,
                );

                expect(currentHandsNew.length).toBe(currentHandsOld.length);
                expect(currentHandsNew).toStrictEqual(currentHandsOld);
            });
            test("Or the length of the 'currentHands' state array is equal to 1", async () => {
                const { setPokerHandCalculatorStateProperty } = contextValue;

                await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 1));

                const currentHandsOld = structuredClone(
                    contextValue.pokerHandCalculatorState.currentHands,
                );

                await act(async () => contextValue.deleteHand(0));

                const currentHandsNew = structuredClone(
                    contextValue.pokerHandCalculatorState.currentHands,
                );

                expect(currentHandsNew.length).toBe(currentHandsOld.length);
                expect(currentHandsNew).toStrictEqual(currentHandsOld);
            });
            test("And should decrease the 'showingHand' state value by 1 if it exceeds the value of the provided 'index' argument", async () => {
                const { setPokerHandCalculatorStateProperty } = contextValue;

                await act(async () => setPokerHandCalculatorStateProperty("showingHand", 3));
                await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 5));

                expect(contextValue.pokerHandCalculatorState.showingHand).toBe(3);

                await act(async () => contextValue.deleteHand(0));

                expect(contextValue.pokerHandCalculatorState.showingHand).toBe(2);
            });
            test("And should set the 'showingHand' state value to -1 if it matches the value of the provided 'index' argument", async () => {
                const { setPokerHandCalculatorStateProperty } = contextValue;

                await act(async () => setPokerHandCalculatorStateProperty("showingHand", 0));
                await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 5));

                expect(contextValue.pokerHandCalculatorState.showingHand).toBe(0);

                await act(async () => contextValue.deleteHand(0));

                expect(contextValue.pokerHandCalculatorState.showingHand).toBe(-1);
            });
        });

        describe("Including the 'shuffleHand' function...", () => {
            test("Which should shuffle a hand's cards", async () => {
                let { currentDeck } = structuredClone(contextValue.pokerHandCalculatorState);
                const { currentHands } = structuredClone(contextValue.pokerHandCalculatorState);

                (global.Math.random as jest.Mock)
                    .mockReturnValueOnce(0.01)
                    .mockReturnValueOnce(0.01);

                await act(async () => contextValue.shuffleHand(0));

                expect(contextValue.pokerHandCalculatorState.currentHands[0].cards).toStrictEqual([
                    currentDeck[0],
                    currentDeck[1],
                ]);

                currentDeck.splice(0, 2);
                currentDeck = currentDeck.concat(currentHands[0].cards);
                expect(contextValue.pokerHandCalculatorState.currentDeck).toStrictEqual(
                    currentDeck,
                );
            });
            test("Unless the provided 'index' argument is less than 0", async () => {
                const { currentDeck } = structuredClone(contextValue.pokerHandCalculatorState);
                const { currentHands } = structuredClone(contextValue.pokerHandCalculatorState);

                await act(async () => contextValue.shuffleHand(-1));

                expect(contextValue.pokerHandCalculatorState.currentDeck).toStrictEqual(
                    currentDeck,
                );
                expect(contextValue.pokerHandCalculatorState.currentHands).toStrictEqual(
                    currentHands,
                );
            });
            test("Or the provided 'index' argument is larger than or equal to the length of the 'currentHands' state array", async () => {
                const { currentDeck } = structuredClone(contextValue.pokerHandCalculatorState);
                const { currentHands } = structuredClone(contextValue.pokerHandCalculatorState);

                await act(async () => contextValue.shuffleHand(1));

                expect(contextValue.pokerHandCalculatorState.currentDeck).toStrictEqual(
                    currentDeck,
                );
                expect(contextValue.pokerHandCalculatorState.currentHands).toStrictEqual(
                    currentHands,
                );
            });
        });

        describe("Including the 'showHand' function", () => {
            test("Which should change the hand being shown (or toggle the current one off)", async () => {
                const { setPokerHandCalculatorStateProperty } = contextValue;

                await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 5));

                expect(contextValue.pokerHandCalculatorState.showingHand).toBe(-1); // Should be off by default

                await act(async () => contextValue.showHand(2));

                expect(contextValue.pokerHandCalculatorState.showingHand).toBe(2);

                await act(async () => contextValue.showHand(2)); // Toggle off

                expect(contextValue.pokerHandCalculatorState.showingHand).toBe(-1);
            });
        });

        describe("Including the 'shuffleBoard' function...", () => {
            test("Which should shuffle all the cards on the board", async () => {
                const { setPokerHandCalculatorStateProperty } = contextValue;
                const { currentDeck } = structuredClone(contextValue.pokerHandCalculatorState);

                (global.Math.random as jest.Mock) // Picking cards for board
                    .mockReturnValueOnce(0.99)
                    .mockReturnValueOnce(0.99)
                    .mockReturnValueOnce(0.99);

                await act(async () => setPokerHandCalculatorStateProperty("boardStage", "flop"));

                (global.Math.random as jest.Mock) // Shuffling cards for board
                    .mockReturnValueOnce(0.001)
                    .mockReturnValueOnce(0.001)
                    .mockReturnValueOnce(0.001);

                await act(async () => contextValue.shuffleBoard());

                expect(contextValue.pokerHandCalculatorState.board).toStrictEqual([
                    currentDeck[0],
                    currentDeck[1],
                    currentDeck[2],
                ]);
            });
        });
    });

    test("Should change the number of hands when the 'numberOfHands' state is changed", async () => {
        const { setPokerHandCalculatorStateProperty } = contextValue;

        expect(contextValue.pokerHandCalculatorState.currentHands.length).toBe(1);
        await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 4));
        expect(contextValue.pokerHandCalculatorState.currentHands.length).toBe(4);
        await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 6));
        expect(contextValue.pokerHandCalculatorState.currentHands.length).toBe(6);
        await act(async () => setPokerHandCalculatorStateProperty("numberOfHands", 2));
        expect(contextValue.pokerHandCalculatorState.currentHands.length).toBe(2);
    });

    test("Should change the number of cards on the board when the 'boardStage' state is changed", async () => {
        const { setPokerHandCalculatorStateProperty } = contextValue;

        expect(contextValue.pokerHandCalculatorState.board.length).toBe(0);
        await act(async () => setPokerHandCalculatorStateProperty("boardStage", "flop"));
        expect(contextValue.pokerHandCalculatorState.board.length).toBe(3);
        await act(async () => setPokerHandCalculatorStateProperty("boardStage", "turn"));
        expect(contextValue.pokerHandCalculatorState.board.length).toBe(4);
        await act(async () => setPokerHandCalculatorStateProperty("boardStage", "river"));
        expect(contextValue.pokerHandCalculatorState.board.length).toBe(5);
        await act(async () => setPokerHandCalculatorStateProperty("boardStage", "pre-flop"));
        expect(contextValue.pokerHandCalculatorState.board.length).toBe(0);
    });

    test("Should have a 'wide' layout when the container element's size exceeds or is equal to 800px, and should display two TabSelector components", async () => {
        expect(screen.queryAllByText("Tab Selector")).toHaveLength(2);
        expect(contextValue.pokerHandCalculatorState.layout).toBe("wide");
    });
    test("Should have a 'thin' layout when the container element's size is lower than 800px, and should display one TabSelector component", async () => {
        expect(screen.queryAllByText("Tab Selector")).toHaveLength(2);
        expect(contextValue.pokerHandCalculatorState.layout).toBe("wide");

        updateMockDimensions(799, 600);
        rerenderFunc(
            <PokerHandCalculator>
                <PokerHandCalculatorContext.Consumer>
                    {(value) => {
                        contextValue = value;
                        return null;
                    }}
                </PokerHandCalculatorContext.Consumer>
            </PokerHandCalculator>,
        );

        expect(screen.queryAllByText("Tab Selector")).toHaveLength(1);
        expect(contextValue.pokerHandCalculatorState.layout).toBe("thin");
    });
});
