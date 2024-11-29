import styles from "./index.module.css";

export function About() {
    return (
        <div className={styles["about"]}>
            <p className={styles["intro"]}>
                {`This application allows you to design a Texas hold 'em poker hand. By creating
                numerous hands and the 'community cards' (known as the 'board' here), the app will
                automatically inform you which hand(s) is/are best and the exact value of each hand
                (e.g.: 'One Pair - Ks').`}
            </p>
            <div className={styles["separator"]}></div>
            <p className={styles["section-title"]}>Hands</p>
            <p className={styles["section-text"]}>
                {`Each hand is comprised of two 'hole cards'. Every hole card in each hand, as well
                as the community cards, must be unique. There can be between 1 and 9 hands
                inclusive.`}
            </p>
            <p className={styles["section-text"]}>
                {`A hand's cards can be changed by clicking a card; this will open a 'card
                selection' UI where a new card can be selected (only available cards are displayed
                in this UI).`}
            </p>
            <p className={styles["section-text"]}>
                When a hand is best, a green tick will be displayed on the hand. It is possible for
                multiple hands to be best simultaneously. In this case, all of the strongest hands
                will display this tick.
            </p>
            <p className={styles["section-text"]}>A hand has multiple options:</p>
            <li className={styles["section-list-item"]}>
                Shuffle: choose two new hole cards for this hand at random.
            </li>
            <li className={styles["section-list-item"]}>
                Delete: delete this hand (this option will not be available if there is only one
                hand).
            </li>
            <li className={styles["section-list-item"]}>
                {`Show: display the best five-card combination between this hand's hole cards and
                the community cards (the best cards will have different styles to the other
                cards).`}
            </li>
            <div className={styles["separator"]}></div>
            <p className={styles["section-title"]}>Board</p>
            <p className={styles["section-text"]}>
                {`The board consists of 0, 3, 4, or 5 'community cards'. Each hole card for every
                hand, in addition to each community card, must be unique.`}
            </p>
            <p className={styles["section-text"]}>
                {`The number of community cards depends on the current 'street' for the hand (this
                can be changed in the Design tab):`}
            </p>
            <li className={styles["section-list-item"]}>
                Pre-flop: All hole cards have been dealt, but the board is empty.
            </li>
            <li className={styles["section-list-item"]}>Flop: Three community cards are dealt.</li>
            <li className={styles["section-list-item"]}>
                Turn: An additional fourth community card is dealt.
            </li>
            <li className={styles["section-list-item"]}>
                River: An additional fifth community card is dealt.
            </li>
            <p className={styles["section-text"]}>
                {`A community card can be changed by clicking a card; this will open a 'card
                selection' UI where a new card can be selected (only available cards are displayed
                in this UI).`}
            </p>
            <p className={styles["section-text"]}>
                Every community card on the board can be shuffled by clicking the shuffle button.
            </p>
        </div>
    );
}
