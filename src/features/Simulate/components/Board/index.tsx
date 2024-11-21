import { useContext } from "react";
import { PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import styles from "./index.module.css";
import { Card } from "../Card";

export function Board() {
    const { pokerHandCalculatorState, shuffleBoard } = useContext(PokerHandCalculatorContext);

    return (
        <div className={styles["board"]}>
            <p className={styles["board-name"]}>Board</p>
            <div className={styles["cards"]}>
                {pokerHandCalculatorState.board.map((card) => {
                    return <Card info={card} key={card.order} />;
                })}
            </div>
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
        </div>
    );
}
