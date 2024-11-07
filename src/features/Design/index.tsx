import { NumberOfHands } from "./fields/NumberOfHands";
import styles from "./index.module.css";

export function Design() {
    return (
        <div className={styles["design"]}>
            <NumberOfHands />
        </div>
    );
}
