import { useContext } from "react";
import { PokerHandCalculatorState, PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import { Card } from "../Card";
import styles from "./index.module.css";

export type THand = {
    info: PokerHandCalculatorState["currentHands"][number];
    number: number;
};

export function Hand({ info, number }: THand) {
    const { shuffleHand, deleteHand } = useContext(PokerHandCalculatorContext);

    return (
        <div className={styles["hand"]}>
            <p className={styles["hand-id"]}>{`Hand ${number}`}</p>
            <div className={styles["cards"]}>
                <Card info={info.hand[0]} />
                <Card info={info.hand[1]} />
            </div>
            <p className={styles["hand-strength"]}>{info.strength.rank}</p>
            <div className={styles["hand-options"]}>
                <button
                    type="button"
                    className={`${styles["shuffle-hand-button"]} material-symbols-sharp`}
                    onClick={(e) => {
                        shuffleHand(number - 1);
                        e.currentTarget.blur();
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.blur();
                    }}
                >
                    Cycle
                </button>
                <button
                    type="button"
                    className={`${styles["delete-hand-button"]} material-symbols-sharp`}
                    onClick={(e) => {
                        deleteHand(number - 1);
                        e.currentTarget.blur();
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.blur();
                    }}
                >
                    Delete
                </button>
            </div>
        </div>
    );
}
