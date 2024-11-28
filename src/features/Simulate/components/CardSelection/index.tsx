import { useContext } from "react";
import { PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import { suitSVG } from "../Card/utils/suitSVGs";
import styles from "./index.module.css";

export function CardSelection() {
    const { pokerHandCalculatorState } = useContext(PokerHandCalculatorContext);

    return (
        <div className={styles["card-selection"]}>
            <p className={styles["card-selection-name"]}>Available Cards</p>
            <ul className={styles["card-list"]}>
                {pokerHandCalculatorState.currentDeck
                    .sort((a, b) => a.order - b.order)
                    .map((card) => {
                        return (
                            <button
                                type="button"
                                className={styles["card"]}
                                onClick={(e) => {
                                    e.currentTarget.blur();
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.blur();
                                }}
                                key={`card-${card.order}`}
                            >
                                <p className={styles["suit"]}>{suitSVG(card.suit)}</p>
                                <p className={styles["rank"]}>{card.rank}</p>
                            </button>
                        );
                    })}
            </ul>
        </div>
    );
}
