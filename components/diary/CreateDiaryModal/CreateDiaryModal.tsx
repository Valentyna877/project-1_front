'use client';

import { useDiaryStore } from '@/lib/store/diaryStore';
import styles from './CreateDiaryModal.module.css';
import { DiaryEntry } from '@/types/diary';

const ALL_EMOTIONS = [
  { id: '1', label: 'Натхнення' },
  { id: '2', label: 'Вдячність' },
  { id: '3', label: 'Тривога' },
  { id: '4', label: 'Дивні бажання' },
  { id: '5', label: 'Нудота' },
];

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (entry: DiaryEntry) => void;
}

export default function CreateDiaryModal({
  isOpen,
  onClose,
  onSuccess,
}: Props) {
  const { draft, isSaving, error, setDraft, toggleEmotion, submitDraft } =
    useDiaryStore();

  if (!isOpen) return null;

  const handleSubmit = () => {
    submitDraft((entry) => {
      onSuccess(entry);
      onClose();
    });
  };

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>Новий запис</h2>

        <div className={styles.field}>
          <label className={styles.label}>Заголовок</label>
          <input
            className={styles.input}
            value={draft.title}
            maxLength={64}
            placeholder="Введіть заголовок"
            onChange={(e) => setDraft({ title: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Опис</label>
          <textarea
            className={styles.textarea}
            value={draft.description}
            maxLength={1000}
            placeholder="Що сьогодні сталося?"
            rows={5}
            onChange={(e) => setDraft({ description: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>
            Емоції ({draft.emotions.length} / 12)
          </label>
          {ALL_EMOTIONS.map((emotion) => (
            <label key={emotion.id} className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={draft.emotions.includes(emotion.id)}
                onChange={() => toggleEmotion(emotion.id)}
              />
              {emotion.label}
            </label>
          ))}
        </div>

        {error && <p className={styles.error}>{error}</p>}

        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Скасувати
          </button>
          <button
            className={styles.submitBtn}
            onClick={handleSubmit}
            disabled={isSaving}
          >
            {isSaving ? 'Збереження...' : 'Зберегти'}
          </button>
        </div>
      </div>
    </div>
  );
}
