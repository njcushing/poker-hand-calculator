export type Card = {
    rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";
    suit: "Heart" | "Club" | "Diamond" | "Spade";
    value: number;
    order: number;
};

export type Hand = [Card, Card];

export type Deck = Card[];

export type Board =
    | []
    | [Card, Card, Card]
    | [Card, Card, Card, Card]
    | [Card, Card, Card, Card, Card];

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

export const pickCard = (deck: Deck): { card: Card; deck: Deck } => {
    const mutableDeck = [...deck];
    const index = Math.floor(Math.random() * mutableDeck.length);
    const card = mutableDeck[index];
    mutableDeck.splice(index, 1);

    return { card, deck: mutableDeck };
};

export const createHand = (deck: Deck): { hand: Hand | null; deck: Deck } => {
    if (deck.length < 2) return { hand: null, deck };

    let mutableDeck = [...deck];

    const pickCardResultOne = pickCard(mutableDeck);
    mutableDeck = pickCardResultOne.deck;

    const pickCardResultTwo = pickCard(mutableDeck);
    mutableDeck = pickCardResultTwo.deck;

    const hand: Hand = [pickCardResultOne.card, pickCardResultTwo.card];

    return { hand, deck: mutableDeck };
};
