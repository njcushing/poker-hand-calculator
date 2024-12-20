import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { TCard } from "@/features/Simulate/components/Card";
import { HandRankings } from ".";
import { handRankingsInformation } from "./utils/handRankingsInformation";
import { Deck, pickCard } from "../Deck/utils/deckFuncs";

// Mock dependencies
function newDeck(): Deck {
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
}

vi.mock("@/features/Deck/utils/deckFuncs", () => {
    return {
        createDeck: vi.fn(() => newDeck()),
        pickCard: vi.fn((deck, order: number) => ({ card: deck[order], deck })),
    };
});

const deck = newDeck();

vi.mock("@/features/Deck/utils/handRankingsInformation", () => ({
    handRankingsInformation: vi.fn(() => [
        {
            name: "Royal Flush",
            cards: [
                { info: pickCard(deck, 10)!.card, showing: true },
                { info: pickCard(deck, 11)!.card, showing: true },
                { info: pickCard(deck, 12)!.card, showing: true },
                { info: pickCard(deck, 13)!.card, showing: true },
                { info: pickCard(deck, 1)!.card, showing: true },
            ],
            description: "Royal Flush - description",
            additionalInformation: "Royal Flush - additional information",
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
            description: "Straight Flush - description",
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
            description: "Four of a Kind - description",
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
            description: "Full House - description",
            additionalInformation: "Full House - additional information",
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
            description: "Flush - description",
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
            description: "Straight - description",
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
            description: "Three of a Kind - description",
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
            description: "Two Pair - description",
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
            description: "One Pair - description",
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
            description: "High Card - description",
        },
    ]),
}));

vi.mock("@/features/Simulate/components/Card", () => ({
    Card: (props: TCard) => {
        const { info, showing, onClick } = props;
        const { rank, suit } = info;
        return (
            <button
                type="button"
                onClick={() => {
                    if (onClick) onClick();
                }}
            >
                {`${rank}-${suit}-${showing}`}
            </button>
        );
    },
}));

describe("The HandRankings component...", () => {
    describe("Should render an unordered list element...", () => {
        test("That contains ten list item elements (one for each hand ranking)", () => {
            render(<HandRankings />);

            const unorderedList = screen.getByRole("list");
            expect(unorderedList).toBeInTheDocument();

            const listItems = screen.getAllByRole("listitem");
            expect(listItems).toHaveLength(10);

            listItems.forEach((listItem) => expect(unorderedList).toContainElement(listItem));
        });
        test("That should each have a paragraph element displaying the ranking's name", () => {
            render(<HandRankings />);

            const listItems = screen.getAllByRole("listitem");
            expect(listItems).toHaveLength(10);

            const names = handRankingsInformation.map((info) => {
                const name = screen.getByText(info.name);
                expect(name.tagName).toBe("P");
                return name;
            });

            listItems.forEach((listItem, i) => expect(listItem).toContainElement(names[i]));
        });
        test("And a paragraph element displaying the ranking's description", () => {
            render(<HandRankings />);

            const listItems = screen.getAllByRole("listitem");
            expect(listItems).toHaveLength(10);

            const descriptions = handRankingsInformation.map((info) => {
                const description = screen.getByText(info.description);
                expect(description.tagName).toBe("P");
                return description;
            });

            listItems.forEach((listItem, i) => expect(listItem).toContainElement(descriptions[i]));
        });
        test("And a paragraph element displaying the ranking's additional information, unless it does not have any", () => {
            render(<HandRankings />);

            const listItems = screen.getAllByRole("listitem");
            expect(listItems).toHaveLength(10);

            const additionalInformation = handRankingsInformation.map((info) => {
                let additionalInfo = null;
                if (info.additionalInformation) {
                    additionalInfo = screen.getByText((_, element) => {
                        return element?.textContent === info.additionalInformation;
                    });
                    expect(additionalInfo.tagName).toBe("P");
                }
                return additionalInfo;
            });

            listItems.forEach((listItem, i) => {
                if (additionalInformation[i]) {
                    expect(listItem).toContainElement(additionalInformation[i]);
                }
            });
        });
        test("And 5 Card components, whose 'info' and 'showing' props come from the 'cards' array in each respective object in the 'handRankingsInformation' array", () => {
            render(<HandRankings />);

            const listItems = screen.getAllByRole("listitem");
            expect(listItems).toHaveLength(10);

            handRankingsInformation.forEach((info, index) => {
                info.cards.forEach((card) => {
                    const { info: cardInfo, showing } = card;
                    const { rank, suit } = cardInfo;

                    const cardComponents = screen.getAllByText(`${rank}-${suit}-${showing}`);

                    const descendantCard = cardComponents.find((cardComponent) =>
                        listItems[index].contains(cardComponent),
                    );

                    expect(descendantCard).toBeInTheDocument();
                });
            });
        });
    });
});
