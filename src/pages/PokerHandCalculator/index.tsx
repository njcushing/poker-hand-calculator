import { createContext, useState, useEffect, useCallback, useRef, useMemo } from "react";
import useResizeObserverElement from "@/hooks/useResizeObserverElement";
import { Structural } from "@/components/structural";
import { Design } from "@/features/Design";
import { Simulate } from "@/features/Simulate";
import {
    Deck,
    Hand,
    Board,
    HandStrength,
    createDeck,
    createHand,
    insertCards,
    pickCards,
    calculateHandStrength,
} from "@/features/Deck/utils/deckFuncs";
import { version } from "../../../package.json";
import styles from "./index.module.css";

export type PokerHandCalculatorState = {
    currentDeck: Deck;
    numberOfHands: number;
    currentHands: { hand: Hand; strength: HandStrength }[];
    boardStage: "pre-flop" | "flop" | "turn" | "river";
    board: Board;
};

const defaultPokerHandCalculatorState: PokerHandCalculatorState = {
    currentDeck: createDeck(),
    numberOfHands: 1,
    currentHands: [],
    boardStage: "pre-flop",
    board: [],
};

interface PokerHandCalculatorContext {
    pokerHandCalculatorState: PokerHandCalculatorState;
    setPokerHandCalculatorStateProperty: <K extends keyof PokerHandCalculatorState>(
        property: K,
        value: PokerHandCalculatorState[K],
    ) => void;
}

const defaultPokerHandCalculatorContext: PokerHandCalculatorContext = {
    pokerHandCalculatorState: defaultPokerHandCalculatorState,
    setPokerHandCalculatorStateProperty: () => {},
};

export const PokerHandCalculatorContext = createContext<PokerHandCalculatorContext>(
    defaultPokerHandCalculatorContext,
);

export function PokerHandCalculator() {
    const [pokerHandCalculatorState, setPokerHandCalculatorState] =
        useState<PokerHandCalculatorState>(defaultPokerHandCalculatorState);

    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize] = useResizeObserverElement({ ref: containerRef });
    const [layout, setLayout] = useState<"wide" | "thin">("wide");

    useEffect(() => {
        if (containerSize[0] >= 800) setLayout("wide");
        else setLayout("thin");
    }, [containerSize]);

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
                    ...newCurrentHands[newCurrentHands.length - 1].hand,
                ]);
                newCurrentHands.pop();
            }

            while (newCurrentHands.length < numberOfHands) {
                const { hand, deck } = createHand(newCurrentDeck);
                newCurrentDeck = deck;
                if (hand) {
                    newCurrentHands.push({ hand, strength: calculateHandStrength(hand, board) });
                }
            }

            return { ...current, currentDeck: newCurrentDeck, currentHands: newCurrentHands };
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

                if (newBoard.length + cards.length === requiredNumberOfCards) {
                    newBoard = [...newBoard, ...cards] as Board;
                } else {
                    newCurrentDeck = currentDeck;
                }
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
                strength: calculateHandStrength(hand.hand, board),
            }));

            return { ...current, currentHands: newCurrentHands };
        });
    }, [pokerHandCalculatorState.board]);

    return (
        <PokerHandCalculatorContext.Provider
            value={useMemo(
                () => ({ pokerHandCalculatorState, setPokerHandCalculatorStateProperty }),
                [pokerHandCalculatorState, setPokerHandCalculatorStateProperty],
            )}
        >
            <div className={`${styles["page"]} ${styles[`${layout}`]}`} ref={containerRef}>
                <div className={styles["left-panel"]}>
                    <h1 className={styles["title"]}>Poker Hand Calculator</h1>
                    <p className={styles["name"]}>by njcushing</p>
                    <p className={styles["version"]}>{`v${version}`}</p>
                    <Structural.TabSelector
                        tabs={{
                            design: { name: "Design", content: <Design />, position: "left" },
                            about: { name: "About", content: <p>About</p>, position: "right" },
                        }}
                    />
                </div>
                <div className={styles["right-panel"]}>
                    <Structural.TabSelector
                        tabs={{
                            simulate: { name: "Simulate", content: <Simulate />, position: "left" },
                            data: { name: "Data", content: <p>Data</p>, position: "left" },
                        }}
                    />
                </div>
            </div>
        </PokerHandCalculatorContext.Provider>
    );
}
