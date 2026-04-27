"use client";

import { DiaryEntry } from "@/lib/api/diaryApi";
import styles from "./DiaryEntryDetails.module.css";

interface DiaryEntryDetailsProps {
  entry?: DiaryEntry | null;
  onDelete?: (id: string) => void;
  onEdit?: (entry: DiaryEntry) => void;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function DiaryEntryDetails({
  entry,
  onDelete,
  onEdit,
}: DiaryEntryDetailsProps) {
  if (!entry) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.placeholder}>No diary entries yet</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <div className={styles.titleGroup}>
          <h2 className={styles.title}>{entry.title}</h2>
          {onEdit && (
            <button
              className={styles.iconBtn}
              aria-label="Edit entry"
              onClick={() => onEdit(entry)}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
              </svg>
            </button>
          )}
        </div>

        <div className={styles.metaGroup}>
          <span className={styles.date}>{formatDate(entry.date)}</span>
          {onDelete && (
            <button
              className={styles.iconBtn}
              aria-label="Delete entry"
              onClick={() => onDelete(entry.id)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="9" y1="9" x2="15" y2="15"></line>
                <line x1="15" y1="9" x2="9" y2="15"></line>
              </svg>
            </button>
          )}
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.body}>
          {entry.description.split("\n\n").map((paragraph, i) => (
            <p key={i} className={styles.text}>
              {paragraph}
            </p>
          ))}
        </div>

        {entry.emotions.length > 0 && (
          <div className={styles.emotions}>
            {entry.emotions.map((e) => (
              <span key={e} className={styles.emotion}>
                {e}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
