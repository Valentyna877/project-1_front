"use client";

import styles from "./CreateDiaryModal.module.css";
import { DiaryEntry } from "@/lib/api/diaryApi";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: () => void;
  isSaving: boolean;

  editingEntry: DiaryEntry | null;

  title: string;
  setTitle: (v: string) => void;

  description: string;
  setDescription: (v: string) => void;

  date: string;
  setDate: (v: string) => void;

  emotions: string;
  setEmotions: (v: string) => void;
}

export default function CreateDiaryModal({
  isOpen,
  onClose,
  onSubmit,
  isSaving,
  editingEntry,
  title,
  setTitle,
  description,
  setDescription,
  date,
  setDate,
  emotions,
  setEmotions,
}: Props) {
  if (!isOpen) return null;

  return (
    <div className={styles.backdrop} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 className={styles.modalTitle}>
          {editingEntry ? "Редагувати запис" : "Новий запис"}
        </h2>

        <div className={styles.field}>
          <label className={styles.label}>Заголовок</label>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введіть заголовок"
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Опис</label>
          <textarea
            className={styles.textarea}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Що сьогодні сталося?"
            rows={5}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Дата</label>
          <input
            className={styles.input}
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div className={styles.field}>
          <label className={styles.label}>Емоції (через кому)</label>
          <input
            className={styles.input}
            value={emotions}
            onChange={(e) => setEmotions(e.target.value)}
            placeholder="радість, спокій, натхнення"
          />
        </div>

        <div className={styles.modalActions}>
          <button className={styles.cancelBtn} onClick={onClose}>
            Скасувати
          </button>
          <button
            className={styles.submitBtn}
            onClick={onSubmit}
            disabled={isSaving}
          >
            {isSaving ? "Збереження..." : "Зберегти"}
          </button>
        </div>
      </div>
    </div>
  );
}
