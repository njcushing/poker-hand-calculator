import { useContext } from "react";
import { PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import { SimulateContext } from "../..";
import { suitSVG } from "../Card/utils/suitSVGs";
import styles from "./index.module.css";

export function CardSelection() {
    const { pokerHandCalculatorState, swapCard } = useContext(PokerHandCalculatorContext);
    const { selectingCard, setSelectingCard } = useContext(SimulateContext);

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
                                    if (selectingCard) {
                                        swapCard(selectingCard[0], selectingCard[1], card.order);
                                    }
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
            <div className={styles["card-selection-options"]}>
                <button
                    type="button"
                    className={`${styles["close-button"]} material-symbols-sharp`}
                    onClick={(e) => {
                        if (selectingCard) setSelectingCard(selectingCard[0], selectingCard[1]);
                        e.currentTarget.blur();
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.blur();
                    }}
                >
                    Close
                </button>
            </div>
        </div>
    );
}
