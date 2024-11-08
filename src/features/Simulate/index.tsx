import { useContext } from "react";
import { PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import { v4 as uuid } from "uuid";
import { Hand } from "./components/Hand";
import styles from "./index.module.css";

export function Simulate() {
    const { pokerHandCalculatorState } = useContext(PokerHandCalculatorContext);

    return (
        <div className={styles["simulate"]}>
            <div className={styles["hands-container"]}>
                {pokerHandCalculatorState.currentHands.map((hand) => {
                    return <Hand info={hand} key={`hand-${uuid()}`} />;
                })}
            </div>
        </div>
    );
}
