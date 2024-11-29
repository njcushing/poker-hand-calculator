import { Card } from "@/features/Simulate/components/Card";
import {
    Card as TCard,
    handStrengthRankOrder,
    createDeck,
    pickCard,
} from "../Deck/utils/deckFuncs";
import styles from "./index.module.css";

type THandStrength = {
    name: (typeof handStrengthRankOrder)[number];
    cards: TCard[];
    description: string;
    additionalInformation?: string;
};

const deck = createDeck();

const handStrengths: THandStrength[] = [
    {
        name: "Royal Flush",
        cards: [
            pickCard(deck, 10)!.card,
            pickCard(deck, 11)!.card,
            pickCard(deck, 12)!.card,
            pickCard(deck, 13)!.card,
            pickCard(deck, 1)!.card,
        ],
        description: "Five consecutive suited cards from 10 to A.",
    },
    {
        name: "Straight Flush",
        cards: [
            pickCard(deck, 18)!.card,
            pickCard(deck, 19)!.card,
            pickCard(deck, 20)!.card,
            pickCard(deck, 21)!.card,
            pickCard(deck, 22)!.card,
        ],
        description: "Five consecutive suited cards (excluding 10 to A; a Royal Flush).",
    },
    {
        name: "Four of a Kind",
        cards: [
            pickCard(deck, 2)!.card,
            pickCard(deck, 15)!.card,
            pickCard(deck, 28)!.card,
            pickCard(deck, 41)!.card,
        ],
        description: "Four cards of the same rank.",
    },
    {
        name: "Full House",
        cards: [
            pickCard(deck, 3)!.card,
            pickCard(deck, 16)!.card,
            pickCard(deck, 29)!.card,
            pickCard(deck, 4)!.card,
            pickCard(deck, 17)!.card,
        ],
        description: "Three cards of the same rank, and two cards of a different rank.*",
        additionalInformation: `* In cases where the player has two sets of three of a kind, the
        three cards of the same rank will be comprised from the set with the higher value, and the
        two cards of the same rank will be comprised from the set with the lower value.`,
    },
    {
        name: "Flush",
        cards: [
            pickCard(deck, 43)!.card,
            pickCard(deck, 44)!.card,
            pickCard(deck, 47)!.card,
            pickCard(deck, 49)!.card,
            pickCard(deck, 51)!.card,
        ],
        description: "Five cards of the same suit. Higher value cards are better.",
    },
    {
        name: "Straight",
        cards: [
            pickCard(deck, 16)!.card,
            pickCard(deck, 4)!.card,
            pickCard(deck, 44)!.card,
            pickCard(deck, 32)!.card,
            pickCard(deck, 7)!.card,
        ],
        description: "Five consecutive cards that are not all of the same suit.",
    },
    {
        name: "Three of a Kind",
        cards: [pickCard(deck, 9)!.card, pickCard(deck, 22)!.card, pickCard(deck, 48)!.card],
        description: "Three cards of the same rank.",
    },
    {
        name: "Two Pair",
        cards: [
            pickCard(deck, 51)!.card,
            pickCard(deck, 25)!.card,
            pickCard(deck, 35)!.card,
            pickCard(deck, 22)!.card,
        ],
        description: "Two cards of the same rank, and two cards of a different rank.",
    },
    {
        name: "One Pair",
        cards: [pickCard(deck, 27)!.card, pickCard(deck, 1)!.card],
        description: "Two cards of the same rank.",
    },
    {
        name: "High Card",
        cards: [pickCard(deck, 39)!.card],
        description: "The card with the highest value.",
    },
];

export function HandStrengths() {
    return (
        <ul className={styles["hand-strengths"]}>
            <p className={styles["hand-strengths-title"]}>
                The following hand strengths are ordered from strongest to weakest.
            </p>
            {handStrengths.map((handStrength) => {
                const { name, cards, description, additionalInformation } = handStrength;
                return (
                    <li className={styles["hand-strength-container"]} key={name}>
                        <div className={styles["separator"]}></div>
                        <p className={styles["hand-strength-name"]}>{name}</p>
                        <ul className={styles["hand-strength-cards"]}>
                            {cards.map((card) => {
                                return (
                                    <Card
                                        info={card}
                                        displayOnly
                                        key={`card-${card.rank}-${card.suit}`}
                                    />
                                );
                            })}
                        </ul>
                        <p className={styles["hand-strength-description"]}>{description}</p>
                        {additionalInformation && (
                            <p className={styles["hand-strength-additional-information"]}>
                                {additionalInformation}
                            </p>
                        )}
                    </li>
                );
            })}
        </ul>
    );
}
