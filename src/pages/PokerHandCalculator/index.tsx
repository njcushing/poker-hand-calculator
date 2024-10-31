import { useState, useEffect, useRef } from "react";
import useResizeObserverElement from "@/hooks/useResizeObserverElement";
import { version } from "../../../package.json";
import styles from "./index.module.css";

export function PokerHandCalculator() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [containerSize] = useResizeObserverElement({ ref: containerRef });
    const [layout, setLayout] = useState<"wide" | "thin">("wide");

    useEffect(() => {
        if (containerSize[0] >= 800) setLayout("wide");
        else setLayout("thin");
    }, [containerSize]);

    return (
        <div className={`${styles["page"]} ${styles[`${layout}`]}`} ref={containerRef}>
            <div className={styles["left-panel"]}>
                <h1 className={styles["title"]}>Poker Hand Calculator</h1>
                <p className={styles["name"]}>by njcushing</p>
                <p className={styles["version"]}>{`v${version}`}</p>
            </div>
            <div className={styles["right-panel"]}></div>
        </div>
    );
}
