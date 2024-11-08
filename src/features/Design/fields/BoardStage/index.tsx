import { useContext } from "react";
import { PokerHandCalculatorContext, PokerHandCalculatorState } from "@/pages/PokerHandCalculator";
import styles from "./index.module.css";

export function BoardStage() {
    const { pokerHandCalculatorState, setPokerHandCalculatorStateProperty } = useContext(
        PokerHandCalculatorContext,
    );

    return (
        <div className={styles["field-container"]}>
            <p className={`${styles["field-name"]} truncate-ellipsis`}>Board Stage:</p>
            <select
                id="board-stage"
                name="board-stage"
                defaultValue={pokerHandCalculatorState.boardStage || "pre-flop"}
                onChange={(e) => {
                    setPokerHandCalculatorStateProperty(
                        "boardStage",
                        e.target.value as PokerHandCalculatorState["boardStage"],
                    );
                }}
            >
                <option value="pre-flop">Pre-Flop</option>
                <option value="flop">Flop</option>
                <option value="turn">Turn</option>
                <option value="river">River</option>
            </select>
        </div>
    );
}
