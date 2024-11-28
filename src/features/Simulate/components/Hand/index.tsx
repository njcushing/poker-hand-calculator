import { useContext } from "react";
import { PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import { Hand as THandInfo } from "@/features/Deck/utils/deckFuncs";
import { Card } from "../Card";
import styles from "./index.module.css";

export type THand = {
    info: THandInfo;
    number: number;
};

export function Hand({ info, number }: THand) {
    const { pokerHandCalculatorState, shuffleHand, deleteHand } = useContext(
        PokerHandCalculatorContext,
    );

    const isStrongest = pokerHandCalculatorState.strongestHands.some(
        (hand) => hand.index === number - 1,
    );

    return (
        <div className={`${styles["hand"]} ${styles[isStrongest ? "is-strongest" : ""]}`}>
            <div className={styles["top-row"]}>
                <p className={styles["hand-id"]}>{`Hand ${number}`}</p>
                {isStrongest && (
                    <p
                        className={`${styles["strongest-hand-check-mark"]} material-symbols-sharp`}
                        style={{ fontSize: "2rem" }}
                    >
                        Check
                    </p>
                )}
            </div>
            <div className={styles["cards"]}>
                <Card info={info.cards[0]} />
                <Card info={info.cards[1]} />
            </div>
            <p
                className={styles["hand-strength"]}
            >{`${info.strength.rank} - ${info.strength.information}`}</p>
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
                {pokerHandCalculatorState.numberOfHands > 1 && (
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
                )}
            </div>
        </div>
    );
}
