import { vi } from "vitest";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import { act } from "react";
import { ThemeContext, Theme } from ".";
import { IThemeState } from "./utils/themeHelperFuncs";

// Mock dependencies
vi.stubEnv("LOCALSTORAGE_PREFIX", "myAppPrefix");

Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(), // Deprecated
        removeListener: vi.fn(), // Deprecated
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
    })),
});

describe("The Theme component...", () => {
    describe("Should pass context to its descendant components...", () => {
        let contextValue: IThemeState;

        beforeEach(async () => {
            render(
                <Theme>
                    <ThemeContext.Consumer>
                        {(value) => {
                            contextValue = value;
                            return null;
                        }}
                    </ThemeContext.Consumer>
                </Theme>,
            );
        });

        test("Including the current theme", async () => {
            expect(contextValue).toBeDefined();
            expect(contextValue.theme).toBe("default");
        });

        test("Including a setter function for updating the theme", async () => {
            const { setTheme } = contextValue;

            await act(async () => {
                setTheme("dark");
            });

            expect(contextValue.theme).toBe("dark");
        });
    });
});
