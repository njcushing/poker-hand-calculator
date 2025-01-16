import { useContext, useMemo } from "react";
import { PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import { Card as TCardInfo } from "@/features/Deck/utils/deckFuncs";
import { SimulateContext } from "../..";
import styles from "./index.module.css";
import { Card } from "../Card";

export function CardSelection() {
    const { pokerHandCalculatorState, swapCard } = useContext(PokerHandCalculatorContext);
    const { selectingCard, setSelectingCard } = useContext(SimulateContext);

    const cardBeingSwapped = useMemo((): TCardInfo | null => {
        if (!selectingCard) return null;
        return pokerHandCalculatorState.currentHands[selectingCard[0]].cards[selectingCard[1]];
    }, [pokerHandCalculatorState.currentHands, selectingCard]);

    if (!cardBeingSwapped) return null;

    return (
        <div className={styles["card-selection"]}>
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
            <div className={styles["card-being-swapped-container"]}>
                <p className={styles["descriptor"]}>Current card:</p>
                <div className={styles["card-being-swapped"]}>
                    <Card info={cardBeingSwapped} displayOnly />
                </div>
            </div>
            <ul className={styles["card-list"]}>
                {pokerHandCalculatorState.currentDeck
                    .sort((a, b) => a.order - b.order)
                    .map((card) => {
                        return (
                            <Card
                                info={card}
                                onClick={() => {
                                    if (selectingCard) {
                                        swapCard(selectingCard[0], selectingCard[1], card.order);
                                    }
                                }}
                                key={`card-${card.order}`}
                            />
                        );
                    })}
            </ul>
        </div>
    );
}
