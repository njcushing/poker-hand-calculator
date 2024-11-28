import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import { v4 as uuid } from "uuid";
import { Hand } from "./components/Hand";
import { Board } from "./components/Board";
import styles from "./index.module.css";

type TSelectingCard = [number, number] | null;

interface SimulateContext {
    selectingCard: TSelectingCard;
    setSelectingCard: React.Dispatch<React.SetStateAction<TSelectingCard>>;
}

const defaultSimulateContext: SimulateContext = {
    selectingCard: null,
    setSelectingCard: () => {},
};

export const SimulateContext = createContext<SimulateContext>(defaultSimulateContext);

export function Simulate() {
    const { pokerHandCalculatorState } = useContext(PokerHandCalculatorContext);

    const [selectingCard, setSelectingCard] = useState<TSelectingCard>(null);
    useEffect(() => setSelectingCard(null), [pokerHandCalculatorState]);

    return (
        <SimulateContext.Provider
            value={useMemo(
                () => ({ selectingCard, setSelectingCard }),
                [selectingCard, setSelectingCard],
            )}
        >
            <div className={styles["simulate"]}>
                <div className={styles["hands-wrapper"]}>
                    <div className={styles["hands-container"]}>
                        {pokerHandCalculatorState.currentHands.map((hand, i) => {
                            return <Hand info={hand} number={i + 1} key={`hand-${uuid()}`} />;
                        })}
                    </div>
                </div>
                <Board />
            </div>
        </SimulateContext.Provider>
    );
}
