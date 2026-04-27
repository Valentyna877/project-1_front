"use client";

import Link from "next/link";
import styles from "./DiaryEntryCard.module.css";
import { DiaryEntry } from "@/lib/api/diaryApi";

interface DiaryEntryCardProps {
  entry: DiaryEntry;
  isSelected: boolean;
  onSelect: () => void;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function CardContent({ entry }: { entry: DiaryEntry }) {
  return (
    <>
      <div className={styles.row}>
        <span className={styles.title}>{entry.title}</span>
        <span className={styles.date}>{formatDate(entry.date)}</span>
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
    </>
  );
}

export default function DiaryEntryCard({
  entry,
  isSelected,
  onSelect,
}: DiaryEntryCardProps) {
  return (
    <>
      {/* Mobile / tablet */}
      <Link
        href={`/diary/${entry.id}`}
        className={`${styles.card} ${styles.mobile}`}
      >
        <CardContent entry={entry} />
      </Link>

      {/* Desktop */}
      <button
        type="button"
        onClick={onSelect}
        className={`${styles.card} ${styles.desktop} ${isSelected ? styles.selected : ""}`}
      >
        <CardContent entry={entry} />
      </button>
    </>
  );
}
