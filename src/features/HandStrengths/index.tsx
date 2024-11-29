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
    cards: { info: TCard; showing: boolean }[];
    description: string;
    additionalInformation?: string;
};

const deck = createDeck();

const handStrengths: THandStrength[] = [
    {
        name: "Royal Flush",
        cards: [
            { info: pickCard(deck, 10)!.card, showing: true },
            { info: pickCard(deck, 11)!.card, showing: true },
            { info: pickCard(deck, 12)!.card, showing: true },
            { info: pickCard(deck, 13)!.card, showing: true },
            { info: pickCard(deck, 1)!.card, showing: true },
        ],
        description: "Five consecutive suited cards from 10 to A.",
    },
    {
        name: "Straight Flush",
        cards: [
            { info: pickCard(deck, 18)!.card, showing: true },
            { info: pickCard(deck, 19)!.card, showing: true },
            { info: pickCard(deck, 20)!.card, showing: true },
            { info: pickCard(deck, 21)!.card, showing: true },
            { info: pickCard(deck, 22)!.card, showing: true },
        ],
        description: "Five consecutive suited cards (excluding 10 to A; a Royal Flush).",
    },
    {
        name: "Four of a Kind",
        cards: [
            { info: pickCard(deck, 2)!.card, showing: true },
            { info: pickCard(deck, 15)!.card, showing: true },
            { info: pickCard(deck, 28)!.card, showing: true },
            { info: pickCard(deck, 41)!.card, showing: true },
            { info: pickCard(deck, 30)!.card, showing: false },
        ],
        description: "Four cards of the same rank.",
    },
    {
        name: "Full House",
        cards: [
            { info: pickCard(deck, 3)!.card, showing: true },
            { info: pickCard(deck, 16)!.card, showing: true },
            { info: pickCard(deck, 29)!.card, showing: true },
            { info: pickCard(deck, 4)!.card, showing: true },
            { info: pickCard(deck, 17)!.card, showing: true },
        ],
        description: "Three cards of the same rank, and two cards of a different rank.*",
        additionalInformation: `* In cases where the player has two sets of three of a kind, the
        three cards of the same rank will be comprised from the set with the higher value, and the
        two cards of the same rank will be comprised from the set with the lower value.`,
    },
    {
        name: "Flush",
        cards: [
            { info: pickCard(deck, 43)!.card, showing: true },
            { info: pickCard(deck, 44)!.card, showing: true },
            { info: pickCard(deck, 47)!.card, showing: true },
            { info: pickCard(deck, 49)!.card, showing: true },
            { info: pickCard(deck, 51)!.card, showing: true },
        ],
        description: "Five cards of the same suit. Higher value cards are better.",
    },
    {
        name: "Straight",
        cards: [
            { info: pickCard(deck, 16)!.card, showing: true },
            { info: pickCard(deck, 4)!.card, showing: true },
            { info: pickCard(deck, 44)!.card, showing: true },
            { info: pickCard(deck, 32)!.card, showing: true },
            { info: pickCard(deck, 7)!.card, showing: true },
        ],
        description: "Five consecutive cards that are not all of the same suit.",
    },
    {
        name: "Three of a Kind",
        cards: [
            { info: pickCard(deck, 9)!.card, showing: true },
            { info: pickCard(deck, 22)!.card, showing: true },
            { info: pickCard(deck, 48)!.card, showing: true },
            { info: pickCard(deck, 3)!.card, showing: false },
            { info: pickCard(deck, 41)!.card, showing: false },
        ],
        description: "Three cards of the same rank.",
    },
    {
        name: "Two Pair",
        cards: [
            { info: pickCard(deck, 51)!.card, showing: true },
            { info: pickCard(deck, 25)!.card, showing: true },
            { info: pickCard(deck, 35)!.card, showing: true },
            { info: pickCard(deck, 22)!.card, showing: true },
            { info: pickCard(deck, 37)!.card, showing: false },
        ],
        description: "Two cards of the same rank, and two cards of a different rank.",
    },
    {
        name: "One Pair",
        cards: [
            { info: pickCard(deck, 27)!.card, showing: true },
            { info: pickCard(deck, 1)!.card, showing: true },
            { info: pickCard(deck, 34)!.card, showing: false },
            { info: pickCard(deck, 43)!.card, showing: false },
            { info: pickCard(deck, 16)!.card, showing: false },
        ],
        description: "Two cards of the same rank.",
    },
    {
        name: "High Card",
        cards: [
            { info: pickCard(deck, 39)!.card, showing: true },
            { info: pickCard(deck, 12)!.card, showing: false },
            { info: pickCard(deck, 50)!.card, showing: false },
            { info: pickCard(deck, 22)!.card, showing: false },
            { info: pickCard(deck, 16)!.card, showing: false },
        ],
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
