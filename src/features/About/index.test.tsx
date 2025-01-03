import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { About } from ".";

describe("The About component...", () => {
    test("Should render correctly", () => {
        render(<About />);

        expect(screen.getByText("Hands")).toBeInTheDocument();
        expect(screen.getByText("Board")).toBeInTheDocument();
    });
});
