import { Card } from "../Card";
import styles from "./index.module.css";

export function Hand() {
    return (
        <div className={styles["hand"]}>
            <div className={styles["cards"]}>
                <Card />
                <Card />
            </div>
        </div>
    );
}
