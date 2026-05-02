'use client';
// import { useState } from 'react';
import styles from './DiaryList.module.css';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import AddDiaryEntryModal from '@/components/diary/AddDiaryEntryModal/AddDiaryEntryModal';
import { DiaryEntry } from '@/types/diary';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

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
  const params = useSearchParams();
  const router = useRouter();
  const [isOpenModal, setIsOpenModal] = useState(false);

  const isOpenParams = params.get('modal') === 'isOpen';

  const handleClick = () => {
    setIsOpenModal(true);
  };

  const handleCloseClick = () => {
    setIsOpenModal(false);
    router.replace('/diary');
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ваші записи</h2>
        <button
          type="button"
          className={styles.addButton}
          onClick={handleClick}
        >
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
      <AddDiaryEntryModal
        isOpen={isOpenParams || isOpenModal}
        onClose={handleCloseClick}
        isEditing={false}
        // options={data}
      />
    </div>
  );
}
