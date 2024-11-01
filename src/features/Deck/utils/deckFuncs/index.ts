export type Card = {
    rank: "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";
    suit: "Heart" | "Club" | "Diamond" | "Spade";
    order: number;
};

export type Deck = Card[];

export const createDeck = (): Deck => {
    return [
        { rank: "A", suit: "Heart", order: 1 },
        { rank: "2", suit: "Heart", order: 2 },
        { rank: "3", suit: "Heart", order: 3 },
        { rank: "4", suit: "Heart", order: 4 },
        { rank: "5", suit: "Heart", order: 5 },
        { rank: "6", suit: "Heart", order: 6 },
        { rank: "7", suit: "Heart", order: 7 },
        { rank: "8", suit: "Heart", order: 8 },
        { rank: "9", suit: "Heart", order: 9 },
        { rank: "10", suit: "Heart", order: 10 },
        { rank: "J", suit: "Heart", order: 11 },
        { rank: "Q", suit: "Heart", order: 12 },
        { rank: "K", suit: "Heart", order: 13 },
        { rank: "A", suit: "Club", order: 14 },
        { rank: "2", suit: "Club", order: 15 },
        { rank: "3", suit: "Club", order: 16 },
        { rank: "4", suit: "Club", order: 17 },
        { rank: "5", suit: "Club", order: 18 },
        { rank: "6", suit: "Club", order: 19 },
        { rank: "7", suit: "Club", order: 20 },
        { rank: "8", suit: "Club", order: 21 },
        { rank: "9", suit: "Club", order: 22 },
        { rank: "10", suit: "Club", order: 23 },
        { rank: "J", suit: "Club", order: 24 },
        { rank: "Q", suit: "Club", order: 25 },
        { rank: "K", suit: "Club", order: 26 },
        { rank: "A", suit: "Diamond", order: 27 },
        { rank: "2", suit: "Diamond", order: 28 },
        { rank: "3", suit: "Diamond", order: 29 },
        { rank: "4", suit: "Diamond", order: 30 },
        { rank: "5", suit: "Diamond", order: 31 },
        { rank: "6", suit: "Diamond", order: 32 },
        { rank: "7", suit: "Diamond", order: 33 },
        { rank: "8", suit: "Diamond", order: 34 },
        { rank: "9", suit: "Diamond", order: 35 },
        { rank: "10", suit: "Diamond", order: 36 },
        { rank: "J", suit: "Diamond", order: 37 },
        { rank: "Q", suit: "Diamond", order: 38 },
        { rank: "K", suit: "Diamond", order: 39 },
        { rank: "A", suit: "Spade", order: 40 },
        { rank: "2", suit: "Spade", order: 41 },
        { rank: "3", suit: "Spade", order: 42 },
        { rank: "4", suit: "Spade", order: 43 },
        { rank: "5", suit: "Spade", order: 44 },
        { rank: "6", suit: "Spade", order: 45 },
        { rank: "7", suit: "Spade", order: 46 },
        { rank: "8", suit: "Spade", order: 47 },
        { rank: "9", suit: "Spade", order: 48 },
        { rank: "10", suit: "Spade", order: 49 },
        { rank: "J", suit: "Spade", order: 50 },
        { rank: "Q", suit: "Spade", order: 51 },
        { rank: "K", suit: "Spade", order: 52 },
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
