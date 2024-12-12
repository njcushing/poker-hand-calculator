import { createContext, useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useResizeObserverElement } from "@/hooks/useResizeObserverElement";
import { Structural } from "@/components/structural";
import { About } from "@/features/About";
import { Design } from "@/features/Design";
import { HandRankings } from "@/features/HandRankings";
import { Simulate } from "@/features/Simulate";
import {
    Card,
    Deck,
    Hand,
    Board,
    createDeck,
    createHand,
    insertCards,
    pickCard,
    pickCards,
    calculateHandStrength,
    findStrongestHands,
} from "@/features/Deck/utils/deckFuncs";
import { version } from "../../../package.json";
import styles from "./index.module.css";

export type PokerHandCalculatorState = {
    layout: "wide" | "thin";
    currentDeck: Deck;
    numberOfHands: number;
    currentHands: Hand[];
    strongestHands: { hand: Hand; index: number }[];
    showingHand: number;
    boardStage: "pre-flop" | "flop" | "turn" | "river";
    board: Board;
};

const defaultPokerHandCalculatorState: PokerHandCalculatorState = {
    layout: "wide",
    currentDeck: createDeck(),
    numberOfHands: 1,
    currentHands: [],
    strongestHands: [],
    showingHand: -1,
    boardStage: "pre-flop",
    board: [],
};

export interface IPokerHandCalculatorContext {
    pokerHandCalculatorState: PokerHandCalculatorState;
    setPokerHandCalculatorStateProperty: <K extends keyof PokerHandCalculatorState>(
        property: K,
        value: PokerHandCalculatorState[K],
    ) => void;

    swapCard: (handIndex: number, cardIndex: number, newCardOrder: Card["order"]) => void;
    shuffleHand: (index: number) => void;
    deleteHand: (index: number) => void;
    showHand: (index: number) => void;
    shuffleBoard: () => void;
}

const defaultPokerHandCalculatorContext: IPokerHandCalculatorContext = {
    pokerHandCalculatorState: defaultPokerHandCalculatorState,
    setPokerHandCalculatorStateProperty: () => {},

    swapCard: () => {},
    shuffleHand: () => {},
    deleteHand: () => {},
    showHand: () => {},
    shuffleBoard: () => {},
};

export const PokerHandCalculatorContext = createContext<IPokerHandCalculatorContext>(
    defaultPokerHandCalculatorContext,
);

export type TPokerHandCalculator = {
    children?: JSX.Element | JSX.Element[] | null;
};

export function PokerHandCalculator({ children }: TPokerHandCalculator) {
    const [pokerHandCalculatorState, setPokerHandCalculatorState] =
        useState<PokerHandCalculatorState>(defaultPokerHandCalculatorState);

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize] = useResizeObserverElement({ ref: containerRef });

    const [layout, setLayout] = useState<PokerHandCalculatorState["layout"]>("wide");
    useEffect(() => setLayout(containerSize[0] >= 800 ? "wide" : "thin"), [containerSize]);
    useEffect(() => setPokerHandCalculatorState((current) => ({ ...current, layout })), [layout]);

    const setPokerHandCalculatorStateProperty = useCallback(
        <K extends keyof PokerHandCalculatorState>(
            property: K,
            value: PokerHandCalculatorState[K],
        ) => {
            setPokerHandCalculatorState((current) => {
                const mutableState = { ...current };
                mutableState[property] = value;
                return mutableState;
            });
        },
        [],
    );

    // Manage current hands
    useEffect(() => {
        setPokerHandCalculatorState((current) => {
            const { currentDeck, numberOfHands, currentHands, board } = current;
            let newCurrentDeck = [...currentDeck];
            const newCurrentHands = [...currentHands];

            while (newCurrentHands.length > numberOfHands) {
                newCurrentDeck = insertCards(newCurrentDeck, [
                    ...newCurrentHands[newCurrentHands.length - 1].cards,
                ]);
                newCurrentHands.pop();
            }

            while (newCurrentHands.length < numberOfHands) {
                const { hand, deck } = createHand(newCurrentDeck, board);
                newCurrentDeck = deck;
                if (hand) newCurrentHands.push(hand);
            }

            return {
                ...current,
                currentDeck: newCurrentDeck,
                currentHands: newCurrentHands,
                strongestHands: findStrongestHands(newCurrentHands),
            };
        });
    }, [pokerHandCalculatorState.numberOfHands]);

    // Manage current board
    useEffect(() => {
        let requiredNumberOfCards = 0;
        switch (pokerHandCalculatorState.boardStage) {
            case "flop":
                requiredNumberOfCards = 3;
                break;
            case "turn":
                requiredNumberOfCards = 4;
                break;
            case "river":
                requiredNumberOfCards = 5;
                break;
            default:
        }

        setPokerHandCalculatorState((current) => {
            const { currentDeck, board } = current;

            let newBoard: Board = [...board];
            let newCurrentDeck = [...currentDeck];

            if (newBoard.length < requiredNumberOfCards) {
                const cardsToAdd = requiredNumberOfCards - newBoard.length;

                const { cards, deck } = pickCards(newCurrentDeck, cardsToAdd);
                newCurrentDeck = deck;

                newBoard = [...newBoard, ...cards] as Board;
            }

            if (newBoard.length > requiredNumberOfCards) {
                const cardsToRemove = newBoard.length - requiredNumberOfCards;
                for (let i = 0; i < cardsToRemove; i++) {
                    const card = newBoard.pop();
                    if (card) newCurrentDeck = insertCards(newCurrentDeck, [card], "random");
                }
            }

            return { ...current, currentDeck: newCurrentDeck, board: newBoard };
        });
    }, [pokerHandCalculatorState.boardStage, setPokerHandCalculatorStateProperty]);

    // Manage hand strengths
    useEffect(() => {
        setPokerHandCalculatorState((current) => {
            const { currentHands, board } = current;

            const newCurrentHands = [...currentHands].map((hand) => ({
                ...hand,
                strength: calculateHandStrength(hand.cards, board),
            }));

            return {
                ...current,
                currentHands: newCurrentHands,
                strongestHands: findStrongestHands(newCurrentHands),
            };
        });
    }, [pokerHandCalculatorState.board]);

    const swapCard = useCallback(
        (handIndex: number, cardIndex: number, newCardOrder: Card["order"]) => {
            const { currentDeck, currentHands, board } = pokerHandCalculatorState;

            let newCurrentDeck = [...currentDeck];
            const newCurrentHands = [...currentHands];
            const newBoard = [...board] as Board;

            const result = pickCard(newCurrentDeck, newCardOrder);
            if (!result) return;

            let currentCard;
            if (handIndex >= 0) {
                // Hand
                if (handIndex >= newCurrentHands.length) return;
                const hand = newCurrentHands[handIndex];

                if (cardIndex < 0 || cardIndex >= hand.cards.length) return;
                currentCard = hand.cards[cardIndex];

                newCurrentHands[handIndex].cards[cardIndex] = result.card;
            } else {
                // Board
                if (cardIndex < 0 || cardIndex >= newBoard.length) return;
                currentCard = newBoard[cardIndex];

                newBoard[cardIndex] = result.card;
            }

            newCurrentDeck = result.deck;
            newCurrentDeck = insertCards(newCurrentDeck, [currentCard], "random");

            setPokerHandCalculatorState({
                ...pokerHandCalculatorState,
                currentDeck: newCurrentDeck,
                currentHands: newCurrentHands,
                strongestHands: findStrongestHands(newCurrentHands),
                board: newBoard,
            });
        },
        [pokerHandCalculatorState],
    );

    const shuffleHand = useCallback(
        (index: number) => {
            let { currentDeck } = pokerHandCalculatorState;
            const { currentHands, board } = pokerHandCalculatorState;

            if (index < 0 || index >= currentHands.length) return;

            currentDeck = insertCards(currentDeck, currentHands[index].cards, "random");

            const { hand, deck } = createHand(currentDeck, board);
            if (!hand) return;
            currentHands[index] = hand;

            setPokerHandCalculatorState({
                ...pokerHandCalculatorState,
                currentDeck: deck,
                currentHands,
                strongestHands: findStrongestHands(currentHands),
            });
        },
        [pokerHandCalculatorState],
    );

    const deleteHand = useCallback(
        (index: number) => {
            let { currentDeck } = pokerHandCalculatorState;
            const { currentHands, showingHand } = pokerHandCalculatorState;

            if (index < 0 || index >= currentHands.length || currentHands.length === 1) return;

            const hand = currentHands[index];
            currentDeck = insertCards(currentDeck, hand.cards, "random");

            currentHands.splice(index, 1);

            let newShowingHand = showingHand;
            if (showingHand > index) newShowingHand -= 1;
            if (showingHand === index) newShowingHand = -1;

            setPokerHandCalculatorState({
                ...pokerHandCalculatorState,
                numberOfHands: currentHands.length,
                currentDeck,
                currentHands,
                strongestHands: findStrongestHands(currentHands),
                showingHand: newShowingHand,
            });
        },
        [pokerHandCalculatorState],
    );

    const showHand = useCallback(
        (index: number) => {
            const { numberOfHands, showingHand } = pokerHandCalculatorState;
            setPokerHandCalculatorState({
                ...pokerHandCalculatorState,
                showingHand: index < numberOfHands && index !== showingHand ? index : -1,
            });
        },
        [pokerHandCalculatorState],
    );

    const shuffleBoard = useCallback(() => {
        let { currentDeck, board } = pokerHandCalculatorState;

        const boardSize = board.length;

        currentDeck = insertCards(currentDeck, board, "random");
        const { cards, deck } = pickCards(currentDeck, boardSize);

        board = cards as Board;

        setPokerHandCalculatorState({
            ...pokerHandCalculatorState,
            currentDeck: deck,
            board,
        });
    }, [pokerHandCalculatorState]);

    return (
        <PokerHandCalculatorContext.Provider
            value={useMemo(
                () => ({
                    pokerHandCalculatorState,
                    setPokerHandCalculatorStateProperty,

                    swapCard,
                    shuffleHand,
                    deleteHand,
                    showHand,
                    shuffleBoard,
                }),
                [
                    pokerHandCalculatorState,
                    setPokerHandCalculatorStateProperty,

                    swapCard,
                    shuffleHand,
                    deleteHand,
                    showHand,
                    shuffleBoard,
                ],
            )}
        >
            <div className={styles["page"]} ref={containerRef}>
                <div className={styles["left-panel"]}>
                    <h1 className={styles["title"]}>Poker Hand Calculator</h1>
                    <p className={styles["name"]}>by njcushing</p>
                    <p className={styles["version"]}>{`v${version}`}</p>
                    <Structural.TabSelector
                        tabs={{
                            design: { name: "Design", content: <Design />, position: "left" },
                            handRankings: {
                                name: "Hand Rankings",
                                content: <HandRankings />,
                                position: "left",
                            },
                            about: { name: "About", content: <About />, position: "right" },
                        }}
                        selectedTabName="about"
                    />
                </div>
                <div className={styles["right-panel"]}>
                    <Structural.TabSelector
                        tabs={{
                            simulate: { name: "Simulate", content: <Simulate />, position: "left" },
                        }}
                    />
                </div>
            </div>
            {children}
        </PokerHandCalculatorContext.Provider>
    );
}
