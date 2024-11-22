import { useContext } from "react";
import { PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import { v4 as uuid } from "uuid";
import { Hand } from "./components/Hand";
import { Board } from "./components/Board";
import styles from "./index.module.css";

export function Simulate() {
    const { pokerHandCalculatorState } = useContext(PokerHandCalculatorContext);

    return (
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
    );
}
