import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Card, TCard } from ".";

// Mock dependencies
const onClickMock: TCard["onClick"] = vi.fn(() => {});
const defaultProps: TCard = {
    info: {
        rank: "A",
        suit: "Heart",
        value: 13,
        order: 1,
    },
    showing: false,
    onClick: onClickMock,
    displayOnly: false,
};
vi.mock("./utils/suitSVG", () => ({
    suitSVG: vi.fn(() => <svg></svg>),
}));

describe("The Card component...", () => {
    describe("Should render a button...", () => {
        afterEach(() => {
            (onClickMock as jest.Mock).mockRestore();
        });

        test("With an accessible name corresponding to the values of the 'info.rank' and 'info.suit' props", () => {
            render(<Card {...defaultProps} />);
            const button = screen.getByRole("button", { name: "A Heart" });
            expect(button).toBeInTheDocument();
        });
        test("With a 'showing' className if the 'showing' prop is set to 'true'", () => {
            render(<Card {...defaultProps} showing />);
            const button = screen.getByRole("button", { name: "A Heart" });
            expect(button).toBeInTheDocument();

            const classNamesRegex = /(^|[^a-zA-Z0-9])showing([^a-zA-Z0-9]|$)/;
            expect(classNamesRegex.test(button.className)).toBeTruthy();
        });
        test("That, when clicked, should invoke the 'onClick' callback prop", () => {
            render(<Card {...defaultProps} />);
            const button = screen.getByRole("button", { name: "A Heart" });
            expect(button).toBeInTheDocument();

            fireEvent.click(button);
            fireEvent.mouseLeave(button);

            expect(onClickMock).toHaveBeenCalled();
        });
        test("Unless it is disabled, specified by setting the 'displayOnly' prop to 'true'", () => {
            render(<Card {...defaultProps} displayOnly />);
            const button = screen.getByRole("button", { name: "A Heart" });
            expect(button).toBeInTheDocument();

            fireEvent.click(button);
            fireEvent.mouseLeave(button);

            expect(onClickMock).not.toHaveBeenCalled();
        });
    });
});
