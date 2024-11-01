import { useState } from "react";
import styles from "./index.module.css";

type Tab = {
    name?: string;
    content: JSX.Element | JSX.Element[];
};

type Tabs = {
    [key: string]: Tab;
};

export type TTabSelector = {
    tabs: Tabs;
    selectedTabName?: keyof Tabs;
};

export function TabSelector({ tabs, selectedTabName }: TTabSelector) {
    const [selectedTab, setSelectedTab] = useState<keyof Tabs>(
        selectedTabName || Object.keys(tabs)[0],
    );

    return (
        <div className={styles["tab-selector"]}>
            <ul className={styles["tabs"]}>
                {Object.keys(tabs).map((key) => {
                    const tab = tabs[key];
                    return (
                        <li className={styles["tab"]} key={key}>
                            <button type="button" className={styles["tab-button"]}>
                                {tab.name || key}
                            </button>
                        </li>
                    );
                })}
            </ul>
            <div className={styles["tab-content"]}></div>
        </div>
    );
}
