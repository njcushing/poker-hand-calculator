import { Card as TCardInfo } from "@/features/Deck/utils/deckFuncs";
import { suitSVG } from "./utils/suitSVGs";
import styles from "./index.module.css";

export type TCard = {
    info: TCardInfo;
};

export function Card({ info }: TCard) {
    return (
        <button
            type="button"
            className={styles["card"]}
            onClick={(e) => {
                e.currentTarget.blur();
            }}
            onMouseLeave={(e) => {
                e.currentTarget.blur();
            }}
        >
            <p className={styles["suit-top"]}>{suitSVG(info.suit)}</p>
            <p className={styles["rank"]}>{info.rank}</p>
            <p className={styles["suit-bottom"]}>{suitSVG(info.suit)}</p>
        </button>
    );
}
