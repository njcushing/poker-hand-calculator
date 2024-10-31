import { useState, useEffect } from "react";
import { Pages } from "./pages";
import config from "./appconfig.json";

export function App() {
    const [rootElement] = useState<HTMLElement>(document.getElementById("root") as HTMLElement);

    // Use applicable app config values
    useEffect(() => {
        rootElement.style.maxWidth = config.displayMaxWidth;
    }, [rootElement]);

    return <Pages.PokerHandCalculator />;
}
