import { NumberOfHands } from "./fields/NumberOfHands";
import { Street } from "./fields/Street";
import styles from "./index.module.css";

export function Design() {
    return (
        <div className={styles["design"]}>
            <NumberOfHands />
            <Street />
        </div>
    );
}
