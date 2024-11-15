import { useContext } from "react";
import { PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import { calculateHandStrength, Hand as THandInfo } from "@/features/Deck/utils/deckFuncs";
import { Card } from "../Card";
import styles from "./index.module.css";

export type THand = {
    info: THandInfo;
    number: number;
};

export function Hand({ info, number }: THand) {
    const { pokerHandCalculatorState } = useContext(PokerHandCalculatorContext);

    return (
        <div className={styles["hand"]}>
            <p className={styles["hand-id"]}>{`Hand ${number}`}</p>
            <div className={styles["cards"]}>
                <Card info={info[0]} />
                <Card info={info[1]} />
            </div>
            <p className={styles["hand-strength"]}>
                {calculateHandStrength(info, pokerHandCalculatorState.board).rank}
            </p>
        </div>
    );
}
