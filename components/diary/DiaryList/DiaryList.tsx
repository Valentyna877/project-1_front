'use client';
// import { useState } from 'react';
import styles from './DiaryList.module.css';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import AddDiaryEntryModal from '@/components/diary/AddDiaryEntryModal/AddDiaryEntryModal';
import { DiaryEntry } from '@/types/diary';
import { getAllEmotions } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
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
  const { data } = useQuery({
    queryKey: ['emotions'],
    queryFn: getAllEmotions,
  });
  const [isOpenModal, setIsOpenModal] = useState(false);
  const handleClik = () => {
    setIsOpenModal(true);
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ваші записи</h2>
        <button type="button" className={styles.addButton} onClick={handleClik}>
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
        isOpen={isOpenModal}
        onClose={() => setIsOpenModal(false)}
        isEditing={true}
        // options={data}
      />
    </div>
  );
}
