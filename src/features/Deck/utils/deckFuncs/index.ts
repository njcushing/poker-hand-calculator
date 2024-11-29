export type Card = {
    rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";
    suit: "Heart" | "Club" | "Diamond" | "Spade";
    value: number;
    order: number;
};

export type Deck = Card[];

export type Board =
    | []
    | [Card, Card, Card]
    | [Card, Card, Card, Card]
    | [Card, Card, Card, Card, Card];

export const handRankOrder = [
    "High Card",
    "One Pair",
    "Two Pair",
    "Three of a Kind",
    "Straight",
    "Flush",
    "Full House",
    "Four of a Kind",
    "Straight Flush",
    "Royal Flush",
];

export type HandStrength = {
    value: number;
    cards: Card[];
    rank: (typeof handRankOrder)[number];
    information: string;
};

export type Hand = {
    cards: [Card, Card];
    strength: HandStrength;
};

export const createDeck = (): Deck => {
    return [
        { rank: "A", suit: "Heart", value: 13, order: 1 },
        { rank: "2", suit: "Heart", value: 1, order: 2 },
        { rank: "3", suit: "Heart", value: 2, order: 3 },
        { rank: "4", suit: "Heart", value: 3, order: 4 },
        { rank: "5", suit: "Heart", value: 4, order: 5 },
        { rank: "6", suit: "Heart", value: 5, order: 6 },
        { rank: "7", suit: "Heart", value: 6, order: 7 },
        { rank: "8", suit: "Heart", value: 7, order: 8 },
        { rank: "9", suit: "Heart", value: 8, order: 9 },
        { rank: "10", suit: "Heart", value: 9, order: 10 },
        { rank: "J", suit: "Heart", value: 10, order: 11 },
        { rank: "Q", suit: "Heart", value: 11, order: 12 },
        { rank: "K", suit: "Heart", value: 12, order: 13 },
        { rank: "A", suit: "Club", value: 13, order: 14 },
        { rank: "2", suit: "Club", value: 1, order: 15 },
        { rank: "3", suit: "Club", value: 2, order: 16 },
        { rank: "4", suit: "Club", value: 3, order: 17 },
        { rank: "5", suit: "Club", value: 4, order: 18 },
        { rank: "6", suit: "Club", value: 5, order: 19 },
        { rank: "7", suit: "Club", value: 6, order: 20 },
        { rank: "8", suit: "Club", value: 7, order: 21 },
        { rank: "9", suit: "Club", value: 8, order: 22 },
        { rank: "10", suit: "Club", value: 9, order: 23 },
        { rank: "J", suit: "Club", value: 10, order: 24 },
        { rank: "Q", suit: "Club", value: 11, order: 25 },
        { rank: "K", suit: "Club", value: 12, order: 26 },
        { rank: "A", suit: "Diamond", value: 13, order: 27 },
        { rank: "2", suit: "Diamond", value: 1, order: 28 },
        { rank: "3", suit: "Diamond", value: 2, order: 29 },
        { rank: "4", suit: "Diamond", value: 3, order: 30 },
        { rank: "5", suit: "Diamond", value: 4, order: 31 },
        { rank: "6", suit: "Diamond", value: 5, order: 32 },
        { rank: "7", suit: "Diamond", value: 6, order: 33 },
        { rank: "8", suit: "Diamond", value: 7, order: 34 },
        { rank: "9", suit: "Diamond", value: 8, order: 35 },
        { rank: "10", suit: "Diamond", value: 9, order: 36 },
        { rank: "J", suit: "Diamond", value: 10, order: 37 },
        { rank: "Q", suit: "Diamond", value: 11, order: 38 },
        { rank: "K", suit: "Diamond", value: 12, order: 39 },
        { rank: "A", suit: "Spade", value: 13, order: 40 },
        { rank: "2", suit: "Spade", value: 1, order: 41 },
        { rank: "3", suit: "Spade", value: 2, order: 42 },
        { rank: "4", suit: "Spade", value: 3, order: 43 },
        { rank: "5", suit: "Spade", value: 4, order: 44 },
        { rank: "6", suit: "Spade", value: 5, order: 45 },
        { rank: "7", suit: "Spade", value: 6, order: 46 },
        { rank: "8", suit: "Spade", value: 7, order: 47 },
        { rank: "9", suit: "Spade", value: 8, order: 48 },
        { rank: "10", suit: "Spade", value: 9, order: 49 },
        { rank: "J", suit: "Spade", value: 10, order: 50 },
        { rank: "Q", suit: "Spade", value: 11, order: 51 },
        { rank: "K", suit: "Spade", value: 12, order: 52 },
    ];
};

export const shuffleDeck = (deck: Deck): Deck => {
    let currentIndex = deck.length;
    const mutableDeck = deck;

    while (currentIndex !== 0) {
        const randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        [mutableDeck[currentIndex], mutableDeck[randomIndex]] = [
            deck[randomIndex],
            deck[currentIndex],
        ];
    }

    return mutableDeck;
};

export const sortDeck = (deck: Deck): Deck => {
    const mutableDeck = deck;

    mutableDeck.sort((a, b) => {
        return a.order - b.order;
    });

    return mutableDeck;
};

export const insertCards = (
    deck: Deck,
    cards: Card[],
    insertAt: "front" | "back" | "random" = "back",
): Deck => {
    let mutableDeck = deck;
    const sortedDeck: Deck = sortDeck([...deck]);
    const insertableCards: Deck = createDeck();
    sortedDeck.reverse().forEach((card) => {
        insertableCards.splice(card.order - 1, 1);
    });
    const insertableCardOrders: number[] = insertableCards.map((card) => card.order);

    for (let i = 0; i < cards.length; i++) {
        const card = cards[i];
        if (insertableCardOrders.indexOf(card.order) !== -1) {
            switch (insertAt) {
                case "front":
                    mutableDeck = [card, ...mutableDeck];
                    break;
                case "random": {
                    const insertIndex = Math.floor(Math.random() * mutableDeck.length);
                    mutableDeck = [
                        ...mutableDeck.slice(0, insertIndex),
                        card,
                        ...mutableDeck.slice(insertIndex),
                    ];
                    break;
                }
                case "back":
                default:
                    mutableDeck.push(card);
            }

            insertableCardOrders.splice(insertableCardOrders.indexOf(card.order), 1);
        }
    }

    return mutableDeck;
};

export const insertRandomCards = (
    deck: Deck,
    quantity: number,
    insertAt: "front" | "back" | "random" = "back",
): Deck => {
    let mutableDeck = deck;
    const sortedDeck: Deck = sortDeck([...deck]);
    const insertableCards: Deck = createDeck();
    sortedDeck.reverse().forEach((card) => {
        insertableCards.splice(card.order - 1, 1);
    });

    let i = Math.min(quantity, insertableCards.length);
    while (i > 0) {
        const cardIndex = Math.floor(Math.random() * insertableCards.length);

        switch (insertAt) {
            case "front":
                mutableDeck = [insertableCards[cardIndex], ...mutableDeck];
                break;
            case "random": {
                const insertIndex = Math.floor(Math.random() * mutableDeck.length);
                mutableDeck = [
                    ...mutableDeck.slice(0, insertIndex),
                    insertableCards[cardIndex],
                    ...mutableDeck.slice(insertIndex),
                ];
                break;
            }
            case "back":
            default:
                mutableDeck.push(insertableCards[cardIndex]);
        }

        insertableCards.splice(cardIndex, 1);
        i -= 1;
    }

    return mutableDeck;
};

export const pickCard = (deck: Deck, order: number): { card: Card; deck: Deck } | null => {
    const mutableDeck = [...deck];

    const cardIndex = mutableDeck.findIndex((card) => card.order === order);
    if (cardIndex === -1) return null;

    const newCard = mutableDeck[cardIndex];
    mutableDeck.splice(cardIndex, 1);

    return { card: newCard, deck: mutableDeck };
};

export const pickCards = (deck: Deck, quantity: number): { cards: Card[]; deck: Deck } => {
    const mutableDeck = [...deck];
    const cards = [];

    const cardsToAdd = Math.min(quantity, deck.length);
    for (let i = 0; i < cardsToAdd; i++) {
        const index = Math.floor(Math.random() * mutableDeck.length);
        const card = mutableDeck[index];
        mutableDeck.splice(index, 1);
        cards.push(card);
    }

    return { cards, deck: mutableDeck };
};

export const createHand = (deck: Deck, board: Board): { hand: Hand | null; deck: Deck } => {
    if (deck.length < 2) return { hand: null, deck };

    let mutableDeck = [...deck];

    const { cards, deck: newDeck } = pickCards(mutableDeck, 2);
    mutableDeck = newDeck;

    const strength = calculateHandStrength([cards[0], cards[1]], board);
    const hand: Hand = { cards: cards as Hand["cards"], strength };

    return { hand, deck: mutableDeck };
};

export const calculateHandStrength = (handCards: Hand["cards"], board: Board): HandStrength => {
    const areCardsConsecutive = (cards: Card[]): boolean => {
        for (let i = 1; i < cards.length; i++) {
            if (
                cards[i].value !== cards[i - 1].value + 1 &&
                !(cards[i].value === 13 && cards[i - 1].value === 4) // Account for A-5 straight
            ) {
                return false;
            }
        }
        return true;
    };

    const sumRanks = (cards: Card[]): Map<Card["rank"], number> => {
        const ranks = new Map<Card["rank"], number>();
        cards.forEach((card) => {
            const { rank } = card;
            if (!ranks.get(rank)) ranks.set(rank, 0);
            ranks.set(rank, ranks.get(rank)! + 1);
        });
        return ranks;
    };

    const sumSuits = (cards: Card[]): Map<Card["suit"], number> => {
        const suits = new Map<Card["suit"], number>();
        cards.forEach((card) => {
            const { suit } = card;
            if (!suits.get(suit)) suits.set(suit, 0);
            suits.set(suit, suits.get(suit)! + 1);
        });
        return suits;
    };

    const getKickers = (cards: Card[], quantity: number): Card[] => {
        return cards.sort((a, b) => b.value - a.value).slice(0, Math.min(cards.length, quantity));
    };

    const getStrength = (rank: (typeof handRankOrder)[number], cards: Card[]): number => {
        const uniqueValues = 13;
        const additiveValues = [
            handRankOrder.indexOf(rank) * uniqueValues ** 5,
            cards.length > 0 ? cards[0].value * uniqueValues ** 4 : 0,
            cards.length > 1 ? cards[1].value * uniqueValues ** 3 : 0,
            cards.length > 2 ? cards[2].value * uniqueValues ** 2 : 0,
            cards.length > 3 ? cards[3].value * uniqueValues : 0,
            cards.length > 4 ? cards[4].value : 0,
        ];
        return additiveValues.reduce((acc, val) => acc + val, 0);
    };

    const cards: Card[] = [...handCards, ...board];
    const ranks: Map<Card["rank"], number> = sumRanks(cards);
    const suits: Map<Card["suit"], number> = sumSuits(cards);

    const largestRankSize = Math.max(...Array.from(ranks.values()));
    const largestSuitSize = Math.max(...Array.from(suits.values()));

    const cardsByAscendingValue = [...cards].sort((a, b) => a.value - b.value);
    const cardsBySuitAndAscendingValue = [...cards].sort(
        (a, b) => a.suit.localeCompare(b.suit) || a.value - b.value,
    );

    if (cards.length >= 5 && largestSuitSize >= 5) {
        const mutableCards = [...cardsBySuitAndAscendingValue];

        for (let i = mutableCards.length - 1; i > 3; i--) {
            if (mutableCards[i].suit === mutableCards[i - 4].suit) {
                const suitedCards = [...mutableCards].splice(i - 4, 5);
                const areConsecutive = areCardsConsecutive(suitedCards);
                if (areConsecutive) {
                    // Royal Flush
                    if (suitedCards[0].value === 9) {
                        return {
                            value: getStrength("Royal Flush", suitedCards),
                            cards: suitedCards,
                            rank: "Royal Flush",
                            information: `${suitedCards[0].suit}s`,
                        };
                    }

                    // Straight Flush
                    return {
                        value: getStrength("Straight Flush", suitedCards),
                        cards: suitedCards,
                        rank: "Straight Flush",
                        information: (() => {
                            const { suit } = suitedCards[0];
                            const range =
                                suitedCards[4].value === 13 && suitedCards[3].value === 4
                                    ? `${suitedCards[4].rank} to ${suitedCards[3].rank}`
                                    : `${suitedCards[0].rank} to ${suitedCards[4].rank}`;
                            return `${suit}s, ${range}`;
                        })(),
                    };
                }
            }
        }
    }

    // Four of a Kind
    if (cards.length >= 4 && largestRankSize >= 4) {
        const mutableCards = [...cardsByAscendingValue];

        for (let i = 3; i < mutableCards.length; i++) {
            if (mutableCards[i].value === mutableCards[i - 3].value) {
                const quads = mutableCards.slice(i - 3, i + 1);
                mutableCards.splice(i - 3, 4);
                const kickers = getKickers(mutableCards, 1);
                const bestCards = [...quads, ...kickers];
                return {
                    value: getStrength("Four of a Kind", bestCards),
                    cards: bestCards,
                    rank: "Four of a Kind",
                    information: `${bestCards[0].rank}s`,
                };
            }
        }
    }

    // Full House
    if (cards.length >= 4 && largestRankSize >= 3) {
        const mutableCards = [...cardsByAscendingValue];
        const tripsRemoved = [...mutableCards];

        const trips: Card[][] = [];
        for (let i = mutableCards.length - 1; i > 1; i--) {
            if (mutableCards[i].value === mutableCards[i - 2].value) {
                trips.push(mutableCards.slice(i - 2, i + 1));
                tripsRemoved.splice(i - 2, 3);
                i -= 2;
            }
        }

        const pairs: Card[][] = [];
        for (let i = tripsRemoved.length - 1; i > 0; i--) {
            if (tripsRemoved[i].value === tripsRemoved[i - 1].value) {
                pairs.push(tripsRemoved.slice(i - 1, i + 1));
                i -= 1;
            }
        }

        if (trips.length > 1) {
            trips.sort((a, b) => b[0].value - a[0].value);
            const bestCards = [...trips[0], trips[1][0], trips[1][1]];
            return {
                value: getStrength("Full House", bestCards),
                cards: bestCards,
                rank: "Full House",
                information: `${bestCards[0].rank}s full of ${bestCards[3].rank}s`,
            };
        }

        if (trips.length === 1 && pairs.length >= 1) {
            pairs.sort((a, b) => b[0].value - a[0].value);
            const bestCards = [...trips[0], ...pairs[0]];
            return {
                value: getStrength("Full House", bestCards),
                cards: bestCards,
                rank: "Full House",
                information: `${bestCards[0].rank}s full of ${bestCards[3].rank}s`,
            };
        }
    }

    // Flush
    if (cards.length >= 5 && largestSuitSize >= 5) {
        const mutableCards = [...cardsBySuitAndAscendingValue];

        for (let i = mutableCards.length - 1; i > 3; i--) {
            if (mutableCards[i].suit === mutableCards[i - 4].suit) {
                const bestCards = mutableCards.slice(i - 4, i + 1);
                return {
                    value: getStrength("Flush", bestCards),
                    cards: bestCards,
                    rank: "Flush",
                    information: `${bestCards[0].suit}s, ${bestCards[4].rank}-high`,
                };
            }
        }
    }

    // Straight
    if (cards.length >= 5) {
        const mutableCards = [...cardsByAscendingValue];
        const noDuplicates = [...mutableCards];

        for (let i = mutableCards.length - 2; i > 0; i--) {
            if (mutableCards[i].value === mutableCards[i + 1].value) {
                noDuplicates.splice(i + 1, 1);
            }
        }

        if (noDuplicates.length >= 5) {
            for (let i = noDuplicates.length - 1; i > 3; i--) {
                if (areCardsConsecutive(noDuplicates.slice(i - 4, i + 1))) {
                    const bestCards = noDuplicates.slice(i - 4, i + 1);
                    return {
                        value: getStrength("Straight", bestCards),
                        cards: bestCards,
                        rank: "Straight",
                        information: (() => {
                            const range =
                                bestCards[4].value === 13 && bestCards[3].value === 4
                                    ? `${bestCards[4].rank} to ${bestCards[3].rank}`
                                    : `${bestCards[0].rank} to ${bestCards[4].rank}`;
                            return `${range}`;
                        })(),
                    };
                }
            }
        }
    }

    // Three of a Kind
    if (cards.length >= 3 && largestRankSize >= 3) {
        const mutableCards = [...cardsByAscendingValue];

        for (let i = 2; i < mutableCards.length; i++) {
            if (mutableCards[i].value === mutableCards[i - 2].value) {
                const trips = mutableCards.slice(i - 2, i + 1);
                mutableCards.splice(i - 2, i + 1);
                const kickers = getKickers(mutableCards, 2);
                const bestCards = [...trips, ...kickers];
                return {
                    value: getStrength("Three of a Kind", bestCards),
                    cards: bestCards,
                    rank: "Three of a Kind",
                    information: `${bestCards[0].rank}s`,
                };
            }
        }
    }

    if (cards.length >= 2 && largestRankSize >= 2) {
        const mutableCards = [...cardsByAscendingValue];
        const pairsRemoved = [...mutableCards];

        const pairs: Card[][] = [];
        for (let i = mutableCards.length - 1; i > 0; i--) {
            if (mutableCards[i].value === mutableCards[i - 1].value) {
                pairs.push(mutableCards.slice(i - 1, i + 1));
                pairsRemoved.splice(i - 1, 2);
                i -= 1;
            }
        }

        // Two Pair
        if (pairs.length >= 2) {
            pairs.sort((a, b) => b[0].value - a[0].value);
            const kickers = getKickers(pairsRemoved, 1);
            const bestCards = [...pairs[0], ...pairs[1], ...kickers];
            return {
                value: getStrength("Two Pair", bestCards),
                cards: bestCards,
                rank: "Two Pair",
                information: `${bestCards[0].rank}s and ${bestCards[2].rank}s`,
            };
        }

        // One Pair
        const bestCards = [...pairs[0], ...getKickers(pairsRemoved, 3)];
        return {
            value: getStrength("One Pair", bestCards),
            cards: bestCards,
            rank: "One Pair",
            information: `${bestCards[0].rank}s`,
        };
    }

    // High Card
    const bestCards = getKickers([...cards], 5);
    return {
        value: getStrength("High Card", bestCards),
        cards: bestCards,
        rank: "High Card",
        information: `${bestCards[0].rank}`,
    };
};

export const findStrongestHands = (hands: Hand[]): { hand: Hand; index: number }[] => {
    const highestValue = hands.reduce((acc, val) => Math.max(acc, val.strength.value), 0);
    const mappedHands = hands.map((hand, i) => ({ hand, index: i }));
    return mappedHands.filter((obj) => obj.hand.strength.value === highestValue);
};
