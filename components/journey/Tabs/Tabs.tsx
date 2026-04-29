"use client";

import styles from "./Tabs.module.css";

type Tab = {
  label: string;
  value: string;
};

interface TabsProps {
  tabs: Tab[];
  activeTab: string;
  onChange: (value: string) => void;
}

const Tabs = ({ tabs, activeTab, onChange }: TabsProps) => {
  return (
    <div role="tablist" className={styles.tabs}>
      {tabs.map((tab) => {
        const isActive = activeTab === tab.value;
        return (
          <button
            key={tab.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={`${styles.tab} ${isActive ? styles.active : ""}`}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
