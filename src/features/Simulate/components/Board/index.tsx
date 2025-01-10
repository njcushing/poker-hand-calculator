import { useContext, useMemo } from "react";
import { PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import { SimulateContext } from "../..";
import styles from "./index.module.css";
import { Card } from "../Card";

export function Board() {
    const { pokerHandCalculatorState, shuffleBoard } = useContext(PokerHandCalculatorContext);
    const { setSelectingCard } = useContext(SimulateContext);

    const board = useMemo(() => pokerHandCalculatorState.board, [pokerHandCalculatorState.board]);
    const showingCards = useMemo(() => {
        const { currentHands, showingHand } = pokerHandCalculatorState;
        const handShowing = currentHands[showingHand];

        return handShowing
            ? board.map(
                  (boardCard) =>
                      handShowing.strength.cards.findIndex(
                          (handCard) => handCard.order === boardCard.order,
                      ) > -1,
              )
            : pokerHandCalculatorState.board.map(() => false);
    }, [pokerHandCalculatorState, board]);

    return (
        <div className={styles["board"]}>
            <p className={styles["board-name"]}>Board</p>
            <div className={styles["cards"]}>
                {board.map((card, i) => {
                    return (
                        <Card
                            info={card}
                            showing={showingCards[i]}
                            onClick={() => setSelectingCard(-1, i)}
                            key={card.order}
                        />
                    );
                })}
            </div>
            {board.length > 0 && (
                <div className={styles["board-options"]}>
                    <button
                        type="button"
                        className={`${styles["shuffle-board-button"]} material-symbols-sharp`}
                        onClick={(e) => {
                            shuffleBoard();
                            e.currentTarget.blur();
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.blur();
                        }}
                    >
                        Cycle
                    </button>
                </div>
            )}
        </div>
    );
}
