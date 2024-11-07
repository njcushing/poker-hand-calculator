import { createContext, useState, useEffect, useCallback, useRef, useMemo } from "react";
import useResizeObserverElement from "@/hooks/useResizeObserverElement";
import { Structural } from "@/components/structural";
import { Design } from "@/features/Design";
import { Simulate } from "@/features/Simulate";
import { version } from "../../../package.json";
import styles from "./index.module.css";

export type PokerHandCalculatorState = {
    numberOfHands: number;
};

const defaultPokerHandCalculatorState: PokerHandCalculatorState = {
    numberOfHands: 1,
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
