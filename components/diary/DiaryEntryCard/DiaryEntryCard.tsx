'use client';

import Link from 'next/link';
import styles from './DiaryEntryCard.module.css';
import { DiaryEntry } from '@/types/diary';

interface DiaryEntryCardProps {
  entry: DiaryEntry;
  isSelected: boolean;
  onSelect: () => void;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function CardContent({ entry }: { entry: DiaryEntry }) {
  return (
    <>
      <div className={styles.row}>
        <h3 className={styles.title}>{entry.title}</h3>
        <span className={styles.date}>{formatDate(entry.date)}</span>
      </div>
      {entry.emotions.length > 0 && (
        <div className={styles.emotions}>
          {entry.emotions.map((e) => (
            <span key={e._id} className={styles.emotion}>
              {e.title}
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
        href={`/diary/${entry._id}`}
        className={`${styles.card} ${styles.mobile}`}
      >
        <CardContent entry={entry} />
      </Link>

      {/* Desktop */}
      <button
        type="button"
        onClick={onSelect}
        className={`${styles.card} ${styles.desktop} ${isSelected ? styles.selected : ''}`}
      >
        <CardContent entry={entry} />
      </button>
    </>
  );
}
