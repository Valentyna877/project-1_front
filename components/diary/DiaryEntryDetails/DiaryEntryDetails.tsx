'use client';

import { DiaryEntry } from '@/types/diary';
import styles from './DiaryEntryDetails.module.css';

interface DiaryEntryDetailsProps {
  entry?: DiaryEntry | null;
  onDelete?: (entryId: string) => void;
  onEdit?: (entry: DiaryEntry) => void;
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('uk-UA', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
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
        <p className={styles.placeholder}>Ще немає записів</p>
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
              <svg width={24} height={24}>
                <use href="/sprite.svg#icon-edit_square" />
              </svg>
            </button>
          )}
        </div>

        <div className={styles.metaGroup}>
          <span className={styles.date}>{formatDate(entry.date)}</span>
          {onDelete && (
            <button
              className={styles.iconBtn}
              aria-label="Видалити запис"
              onClick={() => onDelete?.(entry.id)}
            >
              <svg width={24} height={24}>
                <use href="/sprite.svg#icon-delete_forever" />
              </svg>
            </button>
          )}
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.body}>
          {entry.description.split('\n\n').map((paragraph, i) => (
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
