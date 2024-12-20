import { vi } from "vitest";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Design } from ".";

// Mock dependencies
vi.mock("./fields/NumberOfHands", () => ({
    NumberOfHands: vi.fn(() => <div>NumberOfHands Component</div>),
}));

vi.mock("./fields/Street", () => ({
    Street: vi.fn(() => <div>Street Component</div>),
}));

describe("The Design component...", () => {
    test("Should render the NumberOfHands component", () => {
        render(<Design />);

        const NumberOfHandsComponent = screen.getByText("NumberOfHands Component");
        expect(NumberOfHandsComponent).toBeInTheDocument();
    });
    test("Should render the Street component", () => {
        render(<Design />);

        const StreetComponent = screen.getByText("Street Component");
        expect(StreetComponent).toBeInTheDocument();
    });
});
