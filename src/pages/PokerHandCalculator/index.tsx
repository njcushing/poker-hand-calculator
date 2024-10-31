import { useState, useEffect, useRef } from "react";
import useResizeObserverElement from "@/hooks/useResizeObserverElement";
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
            <div className={styles["left-panel"]}></div>
            <div className={styles["right-panel"]}></div>
        </div>
    );
}
