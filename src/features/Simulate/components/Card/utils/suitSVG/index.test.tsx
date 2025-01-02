import React from "react";
import "@testing-library/jest-dom";
import { Card } from "@/features/Deck/utils/deckFuncs";
import { suitSVG } from ".";

describe("The 'suitSVG' function...", () => {
    test("Should return an SVG element when the 'suit' argument is any of the following: 'Heart', 'Club', 'Diamond', 'Spade'", () => {
        const suits: Card["suit"][] = ["Heart", "Club", "Diamond", "Spade"];
        suits.forEach((suit) => {
            const element = suitSVG(suit);
            expect(React.isValidElement(element)).toBe(true);
            expect(element!.type).toBe("svg");
        });
    });
    test("And should return null when the 'suit' argument is any other value ", () => {
        // @ts-expect-error - Disabling type checking for function parameters in unit test
        expect(suitSVG(null)).toBeNull();
        // @ts-expect-error - As above
        expect(suitSVG(undefined)).toBeNull();
        // @ts-expect-error - As above
        expect(suitSVG("")).toBeNull();
        // @ts-expect-error - As above
        expect(suitSVG([])).toBeNull();
        // @ts-expect-error - As above
        expect(suitSVG({})).toBeNull();
    });
});
