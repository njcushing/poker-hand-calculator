import { createContext, useContext, useState, useEffect, useCallback, useMemo } from "react";
import { PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import { v4 as uuid } from "uuid";
import { Hand } from "./components/Hand";
import { Board } from "./components/Board";
import styles from "./index.module.css";
import { CardSelection } from "./components/CardSelection";

type TSelectingCard = [number, number] | null;

export interface ISimulateContext {
    selectingCard: TSelectingCard;
    setSelectingCard: (handIndex: number, cardIndex: number) => void;
}

const defaultSimulateContext: ISimulateContext = {
    selectingCard: null,
    setSelectingCard: () => {},
};

export const SimulateContext = createContext<ISimulateContext>(defaultSimulateContext);

export function Simulate() {
    const { pokerHandCalculatorState } = useContext(PokerHandCalculatorContext);

    const [selectingCard, setSelectingCardSetter] = useState<TSelectingCard>(null);
    useEffect(() => setSelectingCardSetter(null), [pokerHandCalculatorState]);

    const setSelectingCard = useCallback(
        (handIndex: number, cardIndex: number) => {
            if (selectingCard && handIndex === selectingCard[0] && cardIndex === selectingCard[1]) {
                setSelectingCardSetter(null);
            } else {
                setSelectingCardSetter([handIndex, cardIndex]);
            }
        },
        [selectingCard, setSelectingCardSetter],
    );

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
                {selectingCard && <CardSelection />}
                <Board />
            </div>
        </SimulateContext.Provider>
    );
}
