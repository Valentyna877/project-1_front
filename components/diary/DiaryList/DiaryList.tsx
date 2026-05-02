import styles from './DiaryList.module.css';
import DiaryEntryCard from '../DiaryEntryCard/DiaryEntryCard';
import AddDiaryEntryModal from '@/components/diary/AddDiaryEntryModal/AddDiaryEntryModal';
import { DiaryEntry } from '@/types/diary';
import { useSearchParams } from 'next/navigation';

interface DiaryListProps {
  entries: DiaryEntry[];
  selectedId: string | null;
  onSelect: (entry: DiaryEntry) => void;
  isModalOpen: boolean;
  onModalOpen: () => void;
  onModalClose: (entry?: DiaryEntry) => void;
}

export default function DiaryList({
  entries,
  selectedId,
  onSelect,
  isModalOpen,
  onModalOpen,
  onModalClose,
}: DiaryListProps) {
  const params = useSearchParams();
  const isOpenParams = params.get('modal') === 'isOpen';
  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h2 className={styles.title}>Ваші записи</h2>
        <button
          type="button"
          className={styles.addButton}
          onClick={onModalOpen}
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
            <li key={entry._id}>
              <DiaryEntryCard
                entry={entry}
                isSelected={entry._id === selectedId}
                onSelect={() => onSelect(entry)}
              />
            </li>
          ))
        )}
      </ul>

      <AddDiaryEntryModal
        isOpen={isOpenParams || isModalOpen}
        onClose={onModalClose}
      />
    </div>
  );
}
