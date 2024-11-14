import { useContext } from "react";
import { PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import styles from "./index.module.css";
import { Card } from "../Card";

export function Board() {
    const { pokerHandCalculatorState } = useContext(PokerHandCalculatorContext);

    return (
        <div className={styles["board"]}>
            <p className={styles["board-name"]}>Board</p>
            <div className={styles["cards"]}>
                {pokerHandCalculatorState.board.map((card) => {
                    return <Card info={card} key={card.order} />;
                })}
            </div>
        </div>
    );
}
