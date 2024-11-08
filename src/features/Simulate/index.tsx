import { useContext, useState, useEffect } from "react";
import { PokerHandCalculatorContext } from "@/pages/PokerHandCalculator";
import { v4 as uuid } from "uuid";
import { Hand } from "./components/Hand";
import styles from "./index.module.css";

export function Simulate() {
    const { pokerHandCalculatorState } = useContext(PokerHandCalculatorContext);

    const [hands, setHands] = useState<JSX.Element[]>([]);
    useEffect(() => {
        setHands((currentHands) => {
            const newHands = [...currentHands];
            while (newHands.length > pokerHandCalculatorState.numberOfHands) {
                newHands.pop();
            }
            while (newHands.length < pokerHandCalculatorState.numberOfHands) {
                newHands.push(<Hand key={uuid()} />);
            }
            return newHands;
        });
    }, [pokerHandCalculatorState.numberOfHands]);

    return (
        <div className={styles["simulate"]}>
            <div className={styles["hands-container"]}>{hands}</div>
        </div>
    );
}
