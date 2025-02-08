import { Card as TCardInfo } from "@/features/Deck/utils/deckFuncs";
import { suitSVG } from "./utils/suitSVG";
import styles from "./index.module.css";

export type TCard = {
    info: TCardInfo;
    showing?: boolean;
    onClick?: () => unknown;
    displayOnly?: boolean;
};

export function Card({ info, showing = false, onClick, displayOnly = false }: TCard) {
    return (
        <button
            type="button"
            aria-label={`${info.rank} ${info.suit}`}
            className={`${styles["card"]} ${styles[showing ? "showing" : ""]}`}
            onClick={(e) => {
                if (onClick) onClick();
                e.currentTarget.blur();
            }}
            onMouseLeave={(e) => {
                e.currentTarget.blur();
            }}
            disabled={displayOnly}
        >
            <p className={styles["suit-top"]}>{suitSVG(info.suit)}</p>
            <svg viewBox="0 0 63 44">
                <title>{info.rank}</title>
                <text
                    className={styles["rank"]}
                    x="50%"
                    y="50%"
                    textAnchor="middle"
                    dominantBaseline="central"
                >
                    {info.rank}
                </text>
            </svg>
            <p className={styles["suit-bottom"]}>{suitSVG(info.suit)}</p>
        </button>
    );
}
