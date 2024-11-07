import { useContext } from "react";
import { PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import styles from "./index.module.css";

export function Design() {
    const { pokerHandCalculatorState } = useContext(PokerHandCalculatorContext);

    return (
        <div className={styles["design"]}>
            <div className={styles["field-container"]}>
                <p className={`${styles["field-name"]} truncate-ellipsis`}>Number of Hands:</p>
                <div className={styles["field-options"]}>
                    <button
                        type="button"
                        className={`${styles["decrease-button"]} material-symbols-sharp`}
                        onClick={(e) => {
                            e.currentTarget.blur();
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.blur();
                        }}
                    >
                        Remove
                    </button>
                    <p className={styles["field-value"]}>
                        {pokerHandCalculatorState.numberOfHands}
                    </p>
                    <button
                        type="button"
                        className={`${styles["increase-button"]} material-symbols-sharp`}
                        onClick={(e) => {
                            e.currentTarget.blur();
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.blur();
                        }}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
