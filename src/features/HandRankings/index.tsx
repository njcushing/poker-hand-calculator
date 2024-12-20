import { Card } from "@/features/Simulate/components/Card";
import { handRankingsInformation } from "./utils/handRankingsInformation";
import styles from "./index.module.css";

export function HandRankings() {
    return (
        <ul className={styles["hand-rankings"]}>
            <p className={styles["hand-rankings-intro"]}>
                The following hand rankings are ordered from strongest to weakest. Highlighted cards
                are the ones responsible for giving a hand its ranking.
            </p>
            {handRankingsInformation.map((handRanking) => {
                const { name, cards, description, additionalInformation } = handRanking;
                return (
                    <li className={styles["hand-ranking-container"]} key={name}>
                        <div className={styles["separator"]}></div>
                        <p className={styles["hand-ranking-name"]}>{name}</p>
                        <div className={styles["hand-ranking-cards"]}>
                            {cards.map((card) => {
                                const { info, showing } = card;
                                const { rank, suit } = info;
                                return (
                                    <Card
                                        info={info}
                                        showing={showing}
                                        displayOnly
                                        key={`card-${rank}-${suit}`}
                                    />
                                );
                            })}
                        </div>
                        <p className={styles["hand-ranking-description"]}>{description}</p>
                        {additionalInformation && (
                            <p className={styles["hand-ranking-additional-information"]}>
                                {additionalInformation}
                            </p>
                        )}
                    </li>
                );
            })}
            <div className={styles["separator"]}></div>
            <p className={styles["hand-rankings-winner-description"]}>
                {`In cases where two or more hands have the same ranking, the winner is determined
                by comparing the highest-ranking card from each hand that forms the ranking for that
                hand. If these cards are identical in value, the next highest-ranking cards that
                comprise the ranking for that hand are compared, and so on, until a winner is
                determined.`}
            </p>
            <p className={styles["hand-rankings-winner-description"]}>
                {`If all cards that comprise the ranking are identical in value, any 'kickers'
                (the highest-value cards remaining that form the best possible 5-card hand) are
                compared in the same way. This process continues until a winner is decided or the
                hands are tied.`}
            </p>
        </ul>
    );
}
