import { useState, useEffect, useCallback } from "react";
import styles from "./index.module.css";

type Tab = {
    name?: string;
    content: JSX.Element | JSX.Element[];
    position?: "left" | "right";
};

type Tabs = {
    [key: string]: Tab;
};

export type TTabSelector = {
    tabs: Tabs;
    selectedTabName?: keyof Tabs;
};

export function TabSelector({ tabs, selectedTabName }: TTabSelector) {
    const [selectedTab, setSelectedTab] = useState<keyof Tabs | null>(
        (() => {
            if (selectedTabName && tabs[selectedTabName]) return selectedTabName;
            if (Object.keys(tabs).length > 0) return Object.keys(tabs)[0];
            return null;
        })(),
    );
    useEffect(() => {
        if (!tabs[selectedTab || ""]) {
            if (Object.keys(tabs).length > 0) {
                setSelectedTab(Object.keys(tabs)[0]);
            } else setSelectedTab(null);
        }
    }, [tabs, selectedTab]);

    const createTab = useCallback(
        (key: keyof Tabs) => {
            const tab = tabs[key];
            const selected = key === selectedTab;
            return (
                <li className={`${styles["tab"]} ${styles[selected ? "selected" : ""]}`} key={key}>
                    <button
                        type="button"
                        className={styles["tab-button"]}
                        onClick={(e) => {
                            e.currentTarget.blur();
                            setSelectedTab(key);
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.blur();
                        }}
                    >
                        {tab.name || key}
                    </button>
                </li>
            );
        },
        [tabs, selectedTab],
    );

    return (
        <div className={styles["tab-selector"]}>
            <div className={styles["tabs"]}>
                <ul className={styles["left"]}>
                    {Object.keys(tabs).map((key) => {
                        const tab = tabs[key];
                        if (tab.position === "right") return null;
                        return createTab(key);
                    })}
                </ul>
                <ul className={styles["right"]}>
                    {Object.keys(tabs).map((key) => {
                        const tab = tabs[key];
                        if (!tab.position || tab.position !== "right") return null;
                        return createTab(key);
                    })}
                </ul>
            </div>
            <div className={styles["tab-content"]}>
                {selectedTab && tabs[selectedTab] && tabs[selectedTab].content}
            </div>
        </div>
    );
}
