import { NumberOfHands } from "./fields/NumberOfHands";
import { BoardStage } from "./fields/BoardStage";
import styles from "./index.module.css";

export function Design() {
    return (
        <div className={styles["design"]}>
            <NumberOfHands />
            <BoardStage />
        </div>
    );
}
