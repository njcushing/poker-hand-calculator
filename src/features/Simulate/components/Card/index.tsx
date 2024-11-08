import { Card as TCardInfo } from "@/features/Deck/utils/deckFuncs";
import styles from "./index.module.css";

export type TCard = {
    info: TCardInfo;
};

export function Card({ info }: TCard) {
    return (
        <div className={styles["card"]}>
            <p className={styles["suit"]}>{info.suit}</p>
            <p className={styles["rank"]}>{info.rank}</p>
        </div>
    );
}
