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
                {Array.from(Array(pokerHandCalculatorState.numberOfHands)).map(() => {
                    return <Hand key={uuid()} />;
                })}
            </div>
        </div>
    );
}
