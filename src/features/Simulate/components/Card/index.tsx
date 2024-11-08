import { Card as TCardInfo } from "@/features/Deck/utils/deckFuncs";
import styles from "./index.module.css";

export type TCard = {
    info: TCardInfo;
};

export function Card({ info }: TCard) {
    return <div className={styles["card"]}></div>;
}
