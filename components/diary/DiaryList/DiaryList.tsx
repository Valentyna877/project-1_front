'use client';

import styles from './DiaryList.module.css';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import { DiaryEntry } from '@/types/diary';

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
        <h2 className={styles.title}>Ваші записи</h2>
        <button type="button" className={styles.addButton} onClick={onAddClick}>
          Новий запис
          <svg width={24} height={24}>
            <use href="/sprite.svg#icon-add_circle" />
          </svg>
        </button>
      </div>

      <ul className={styles.list}>
        {entries.length === 0 ? (
          <li className={styles.empty}>Ще немає записів у щоденнику</li>
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
