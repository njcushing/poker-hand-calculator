import { useContext } from "react";
import { PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import styles from "./index.module.css";

export function NumberOfHands() {
    const { pokerHandCalculatorState, setPokerHandCalculatorStateProperty } = useContext(
        PokerHandCalculatorContext,
    );

    return (
        <div className={styles["field-container"]}>
            <p className={`${styles["field-name"]} truncate-ellipsis`}>Number of Hands:</p>
            <div className={styles["field-options"]}>
                <button
                    type="button"
                    className={`${styles["decrease-button"]} material-symbols-sharp`}
                    onClick={(e) => {
                        setPokerHandCalculatorStateProperty(
                            "numberOfHands",
                            Math.max(1, pokerHandCalculatorState.numberOfHands - 1),
                        );
                        e.currentTarget.blur();
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.blur();
                    }}
                >
                    <p>Remove</p>
                </button>
                <p className={styles["field-value"]}>{pokerHandCalculatorState.numberOfHands}</p>
                <button
                    type="button"
                    className={`${styles["increase-button"]} material-symbols-sharp`}
                    onClick={(e) => {
                        setPokerHandCalculatorStateProperty(
                            "numberOfHands",
                            Math.min(9, pokerHandCalculatorState.numberOfHands + 1),
                        );
                        e.currentTarget.blur();
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.blur();
                    }}
                >
                    <p>Add</p>
                </button>
            </div>
        </div>
    );
}
