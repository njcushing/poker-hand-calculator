import { useState, useEffect, useRef } from "react";
import useResizeObserverElement from "@/hooks/useResizeObserverElement";
import { Structural } from "@/components/structural";
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
                <Structural.TabSelector
                    tabs={{
                        design: { name: "Design", content: <p>Design</p>, position: "left" },
                        about: { name: "About", content: <p>About</p>, position: "right" },
                    }}
                />
            </div>
            <div className={styles["right-panel"]}>
                <Structural.TabSelector
                    tabs={{
                        simulate: { name: "Simulate", content: <p>Simulate</p>, position: "left" },
                        data: { name: "Data", content: <p>Data</p>, position: "left" },
                    }}
                />
            </div>
        </div>
    );
}
