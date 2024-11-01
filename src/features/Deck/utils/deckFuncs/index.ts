const suitOrder = ["Heart", "Club", "Diamond", "Spade"];

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
        { rank: "A", suit: "Club", order: 1 },
        { rank: "2", suit: "Club", order: 2 },
        { rank: "3", suit: "Club", order: 3 },
        { rank: "4", suit: "Club", order: 4 },
        { rank: "5", suit: "Club", order: 5 },
        { rank: "6", suit: "Club", order: 6 },
        { rank: "7", suit: "Club", order: 7 },
        { rank: "8", suit: "Club", order: 8 },
        { rank: "9", suit: "Club", order: 9 },
        { rank: "10", suit: "Club", order: 10 },
        { rank: "J", suit: "Club", order: 11 },
        { rank: "Q", suit: "Club", order: 12 },
        { rank: "K", suit: "Club", order: 13 },
        { rank: "A", suit: "Diamond", order: 1 },
        { rank: "2", suit: "Diamond", order: 2 },
        { rank: "3", suit: "Diamond", order: 3 },
        { rank: "4", suit: "Diamond", order: 4 },
        { rank: "5", suit: "Diamond", order: 5 },
        { rank: "6", suit: "Diamond", order: 6 },
        { rank: "7", suit: "Diamond", order: 7 },
        { rank: "8", suit: "Diamond", order: 8 },
        { rank: "9", suit: "Diamond", order: 9 },
        { rank: "10", suit: "Diamond", order: 10 },
        { rank: "J", suit: "Diamond", order: 11 },
        { rank: "Q", suit: "Diamond", order: 12 },
        { rank: "K", suit: "Diamond", order: 13 },
        { rank: "A", suit: "Spade", order: 1 },
        { rank: "2", suit: "Spade", order: 2 },
        { rank: "3", suit: "Spade", order: 3 },
        { rank: "4", suit: "Spade", order: 4 },
        { rank: "5", suit: "Spade", order: 5 },
        { rank: "6", suit: "Spade", order: 6 },
        { rank: "7", suit: "Spade", order: 7 },
        { rank: "8", suit: "Spade", order: 8 },
        { rank: "9", suit: "Spade", order: 9 },
        { rank: "10", suit: "Spade", order: 10 },
        { rank: "J", suit: "Spade", order: 11 },
        { rank: "Q", suit: "Spade", order: 12 },
        { rank: "K", suit: "Spade", order: 13 },
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
        return suitOrder.indexOf(a.suit) - suitOrder.indexOf(b.suit) || a.order - b.order;
    });

    return mutableDeck;
};
