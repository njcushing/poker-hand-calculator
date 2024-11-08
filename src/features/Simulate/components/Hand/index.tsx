import { Hand as THandInfo } from "@/features/Deck/utils/deckFuncs";
import { Card } from "../Card";
import styles from "./index.module.css";

export type THand = {
    info: THandInfo;
};

export function Hand({ info }: THand) {
    return (
        <div className={styles["hand"]}>
            <div className={styles["cards"]}>
                <Card info={info[0]} />
                <Card info={info[1]} />
            </div>
        </div>
    );
}
