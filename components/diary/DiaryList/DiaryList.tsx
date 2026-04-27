"use client";

import { DiaryEntry } from "@/lib/api/diaryApi";
import styles from "./DiaryList.module.css";
import DiaryEntryCard from "../DiaryEntryCard/DiaryEntryCard";

interface DiaryListProps {
  entries: DiaryEntry[];
  selectedId: string | null;
  onSelect: (entry: DiaryEntry) => void;
  onAddClick: () => void;
}

export default function DiaryList({
  entries,
  selectedId,
  onSelect,
  onAddClick,
}: DiaryListProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Your entries</h2>
        <button type="button" className={styles.addButton} onClick={onAddClick}>
          New entry
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            aria-hidden="true"
          >
            <circle cx="10" cy="10" r="9" stroke="#2d2d2d" strokeWidth="1.5" />
            <path
              d="M10 6v8M6 10h8"
              stroke="#2d2d2d"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      <ul className={styles.list}>
        {entries.length === 0 ? (
          <li className={styles.empty}>No diary entries yet</li>
        ) : (
          entries.map((entry) => (
            <li key={entry.id}>
              <DiaryEntryCard
                entry={entry}
                isSelected={entry.id === selectedId}
                onSelect={() => onSelect(entry)}
              />
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
