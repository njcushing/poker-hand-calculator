/* global describe, test, expect */

import { vi } from "vitest";
import "@testing-library/jest-dom";
import {
    Deck,
    createDeck,
    shuffleDeck,
    sortDeck,
    insertCards,
    insertRandomCards,
    pickCard,
    createHand,
} from ".";

describe("The 'createDeck' function...", () => {
    test("Should return a full 52-card deck in the correct order", () => {
        const deck = createDeck();
        expect(deck.length).toBe(52);
        expect(deck).toStrictEqual([
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
        ]);
    });
});

describe("shuffleDeck", () => {
    test("Should randomise the order of the provided deck", () => {
        const deck: Deck = [
            { rank: "A", suit: "Diamond", value: 13, order: 27 },
            { rank: "2", suit: "Diamond", value: 1, order: 28 },
            { rank: "3", suit: "Diamond", value: 2, order: 29 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
        ];

        // Mock Math.random to return a sequence of predictable values
        vi.spyOn(global.Math, "random")
            .mockReturnValueOnce(0.4)
            .mockReturnValueOnce(0.3)
            .mockReturnValueOnce(0.2)
            .mockReturnValueOnce(0.1);

        const shuffledDeck = shuffleDeck(deck);

        expect(shuffledDeck).toStrictEqual([
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "3", suit: "Diamond", value: 2, order: 29 },
            { rank: "A", suit: "Diamond", value: 13, order: 27 },
            { rank: "2", suit: "Diamond", value: 1, order: 28 },
        ]);

        (global.Math.random as jest.Mock).mockRestore();
    });
});

describe("The 'sortDeck' function...", () => {
    test("Should sort the provided deck into the correct order", () => {
        const deck: Deck = [
            { rank: "A", suit: "Diamond", value: 13, order: 27 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
            { rank: "3", suit: "Spade", value: 2, order: 42 },
            { rank: "7", suit: "Heart", value: 6, order: 7 },
            { rank: "4", suit: "Spade", value: 3, order: 43 },
            { rank: "5", suit: "Club", value: 4, order: 18 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "3", suit: "Heart", value: 2, order: 3 },
        ];

        const sortedDeck = sortDeck(deck);

        expect(sortedDeck).toStrictEqual([
            { rank: "3", suit: "Heart", value: 2, order: 3 },
            { rank: "7", suit: "Heart", value: 6, order: 7 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
            { rank: "5", suit: "Club", value: 4, order: 18 },
            { rank: "A", suit: "Diamond", value: 13, order: 27 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "3", suit: "Spade", value: 2, order: 42 },
            { rank: "4", suit: "Spade", value: 3, order: 43 },
        ]);
    });
});

describe("The 'insertCards' function...", () => {
    test("Should return the provided deck if the 'cards' array parameter has no entries", () => {
        const deck: Deck = [{ rank: "A", suit: "Heart", value: 13, order: 1 }];

        expect(insertCards([...deck], [])).toStrictEqual(deck);
        expect(insertCards([...deck], [])).toStrictEqual(deck);
        expect(insertCards([...deck], [])).toStrictEqual(deck);
    });
    test("Should return a deck with additional cards (1 new card)", () => {
        const deck: Deck = [
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ];

        const newDeck = insertCards(deck, [{ rank: "9", suit: "Club", value: 8, order: 22 }]);

        expect(newDeck).toStrictEqual([
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
            { rank: "9", suit: "Club", value: 8, order: 22 },
        ]);
    });
    test("Should return a deck with additional cards (3 new cards)", () => {
        const deck: Deck = [
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ];

        const newDeck = insertCards(deck, [
            { rank: "9", suit: "Club", value: 8, order: 22 },
            { rank: "4", suit: "Club", value: 3, order: 17 },
            { rank: "J", suit: "Heart", value: 10, order: 11 },
        ]);

        expect(newDeck).toStrictEqual([
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
            { rank: "9", suit: "Club", value: 8, order: 22 },
            { rank: "4", suit: "Club", value: 3, order: 17 },
            { rank: "J", suit: "Heart", value: 10, order: 11 },
        ]);
    });
    test("Should not insert cards that already exist within the specified deck", () => {
        const deck: Deck = [
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ];

        const newDeck = insertCards(deck, [{ rank: "2", suit: "Club", value: 1, order: 15 }]);

        expect(newDeck).toStrictEqual([
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ]);
    });
    test("Should place new cards at the back by default", () => {
        const deck: Deck = [
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ];

        const newDeck = insertCards(deck, [{ rank: "9", suit: "Club", value: 8, order: 22 }]);

        expect(newDeck).toStrictEqual([
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
            { rank: "9", suit: "Club", value: 8, order: 22 },
        ]);
    });
    test("Should place new cards at the back of the deck when specified", () => {
        const deck: Deck = [
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ];

        const newDeck = insertCards(
            deck,
            [{ rank: "9", suit: "Club", value: 8, order: 22 }],
            "back",
        );

        expect(newDeck).toStrictEqual([
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
            { rank: "9", suit: "Club", value: 8, order: 22 },
        ]);
    });
    test("Should place new cards at the front of the deck when specified", () => {
        const deck: Deck = [
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ];

        const newDeck = insertCards(
            deck,
            [{ rank: "9", suit: "Club", value: 8, order: 22 }],
            "front",
        );

        expect(newDeck).toStrictEqual([
            { rank: "9", suit: "Club", value: 8, order: 22 },
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ]);
    });
    test("Should place new cards in a random position in the deck when specified", () => {
        const deck: Deck = [
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ];

        vi.spyOn(global.Math, "random").mockReturnValueOnce(0.4);

        const newDeck = insertCards(
            deck,
            [{ rank: "9", suit: "Club", value: 8, order: 22 }],
            "random",
        );

        expect(newDeck).toStrictEqual([
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "9", suit: "Club", value: 8, order: 22 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ]);

        (global.Math.random as jest.Mock).mockRestore();
    });
});

describe("The 'insertRandomCards' function...", () => {
    test("Should return the provided deck if the 'quantity' parameter has a value lower than 1", () => {
        const deck: Deck = [{ rank: "A", suit: "Heart", value: 13, order: 1 }];

        expect(insertRandomCards([...deck], 0)).toStrictEqual(deck);
        expect(insertRandomCards([...deck], -10)).toStrictEqual(deck);
        expect(insertRandomCards([...deck], -1000)).toStrictEqual(deck);
    });
    test("Should return a deck with additional random cards (1 new card)", () => {
        const deck: Deck = [
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ];

        vi.spyOn(global.Math, "random").mockReturnValueOnce(0.4);

        const newDeck = insertRandomCards(deck, 1);

        expect(newDeck).toStrictEqual([
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
            { rank: "9", suit: "Club", value: 8, order: 22 },
        ]);

        (global.Math.random as jest.Mock).mockRestore();
    });
    test("Should return a deck with additional random cards (3 new cards)", () => {
        const deck: Deck = [
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ];

        vi.spyOn(global.Math, "random")
            .mockReturnValueOnce(0.4)
            .mockReturnValueOnce(0.3)
            .mockReturnValueOnce(0.2);

        const newDeck = insertRandomCards(deck, 3);

        expect(newDeck).toStrictEqual([
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
            { rank: "9", suit: "Club", value: 8, order: 22 },
            { rank: "4", suit: "Club", value: 3, order: 17 },
            { rank: "J", suit: "Heart", value: 10, order: 11 },
        ]);

        (global.Math.random as jest.Mock).mockRestore();
    });
    test("Should return a deck that never exceeds 52 cards in size", () => {
        const deck: Deck = [
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

        const newDeck = insertRandomCards(deck, 1000);

        expect(newDeck).toStrictEqual([
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
        ]);
    });
    test("Should place new cards at the back by default", () => {
        const deck: Deck = [
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ];

        vi.spyOn(global.Math, "random").mockReturnValueOnce(0.4);

        const newDeck = insertRandomCards(deck, 1);

        expect(newDeck).toStrictEqual([
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
            { rank: "9", suit: "Club", value: 8, order: 22 },
        ]);

        (global.Math.random as jest.Mock).mockRestore();
    });
    test("Should place new cards at the back of the deck when specified", () => {
        const deck: Deck = [
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ];

        vi.spyOn(global.Math, "random").mockReturnValueOnce(0.4);

        const newDeck = insertRandomCards(deck, 1, "back");

        expect(newDeck).toStrictEqual([
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
            { rank: "9", suit: "Club", value: 8, order: 22 },
        ]);

        (global.Math.random as jest.Mock).mockRestore();
    });
    test("Should place new cards at the front of the deck when specified", () => {
        const deck: Deck = [
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ];

        vi.spyOn(global.Math, "random").mockReturnValueOnce(0.4);

        const newDeck = insertRandomCards(deck, 1, "front");

        expect(newDeck).toStrictEqual([
            { rank: "9", suit: "Club", value: 8, order: 22 },
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ]);

        (global.Math.random as jest.Mock).mockRestore();
    });
    test("Should place new cards in a random position in the deck when specified", () => {
        const deck: Deck = [
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ];

        vi.spyOn(global.Math, "random").mockReturnValueOnce(0.4).mockReturnValueOnce(0.5);

        const newDeck = insertRandomCards(deck, 1, "random");

        expect(newDeck).toStrictEqual([
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "9", suit: "Club", value: 8, order: 22 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ]);

        (global.Math.random as jest.Mock).mockRestore();
    });
});

describe("The 'pickCard' function...", () => {
    test("Should pick a card in the deck at random and return it", () => {
        const deck: Deck = [
            { rank: "A", suit: "Diamond", value: 13, order: 27 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
            { rank: "3", suit: "Spade", value: 2, order: 42 },
        ];

        vi.spyOn(global.Math, "random").mockReturnValueOnce(0.4).mockReturnValueOnce(0.5);

        const { card } = pickCard(deck);

        expect(card).toStrictEqual({ rank: "2", suit: "Club", value: 1, order: 15 });

        (global.Math.random as jest.Mock).mockRestore();
    });
    test("Should remove the picked card from the deck and return the new deck", () => {
        const deck: Deck = [
            { rank: "A", suit: "Diamond", value: 13, order: 27 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
            { rank: "3", suit: "Spade", value: 2, order: 42 },
        ];

        vi.spyOn(global.Math, "random").mockReturnValueOnce(0.4).mockReturnValueOnce(0.5);

        const result = pickCard(deck);

        expect(result.deck).toStrictEqual([
            { rank: "A", suit: "Diamond", value: 13, order: 27 },
            { rank: "3", suit: "Spade", value: 2, order: 42 },
        ]);

        (global.Math.random as jest.Mock).mockRestore();
    });
});

describe("The 'createHand' function...", () => {
    test("Should return a null hand if the deck contains fewer than two cards", () => {
        const deck: Deck = [{ rank: "A", suit: "Diamond", value: 13, order: 27 }];

        const { hand } = createHand(deck);

        expect(hand).toBeNull();
    });
    test("Should return a hand containing two random cards from the deck", () => {
        const deck: Deck = [
            { rank: "9", suit: "Club", value: 8, order: 22 },
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ];

        vi.spyOn(global.Math, "random").mockReturnValueOnce(0.4).mockReturnValueOnce(0.8);

        const { hand } = createHand(deck);

        expect(hand).toStrictEqual([
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ]);

        (global.Math.random as jest.Mock).mockRestore();
    });
    test("Should remove the two picked cards from the deck and return the new deck", () => {
        const deck: Deck = [
            { rank: "9", suit: "Club", value: 8, order: 22 },
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "4", suit: "Diamond", value: 3, order: 30 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
            { rank: "2", suit: "Club", value: 1, order: 15 },
        ];

        vi.spyOn(global.Math, "random").mockReturnValueOnce(0.4).mockReturnValueOnce(0.8);

        const result = createHand(deck);

        expect(result.deck).toStrictEqual([
            { rank: "9", suit: "Club", value: 8, order: 22 },
            { rank: "A", suit: "Heart", value: 13, order: 1 },
            { rank: "10", suit: "Spade", value: 9, order: 49 },
        ]);

        (global.Math.random as jest.Mock).mockRestore();
    });
});
