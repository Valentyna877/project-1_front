'use client';

import { DiaryEntry } from '@/types/diary';
import styles from './DiaryEntryDetails.module.css';
import ConfirmationModal from '@/components/common/ConfirmationModal/ConfirmationModal';
import { useState } from 'react';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';

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

const SENTENCES_PER_PARAGRAPH = 3;
const AUTO_SPLIT_THRESHOLD = 200;

function splitIntoParagraphs(text: string): string[] {
  const explicit = text
    .split(/(?:\r?\n){2,}/)
    .map((p) => p.trim())
    .filter(Boolean);

  return explicit.flatMap((chunk) => {
    if (chunk.length <= AUTO_SPLIT_THRESHOLD) return [chunk];
    const sentences = chunk.match(/[^.!?…]+[.!?…]+["')\]]*\s*|[^.!?…]+$/g);
    if (!sentences || sentences.length <= SENTENCES_PER_PARAGRAPH)
      return [chunk];
    const groups: string[] = [];
    for (let i = 0; i < sentences.length; i += SENTENCES_PER_PARAGRAPH) {
      groups.push(
        sentences
          .slice(i, i + SENTENCES_PER_PARAGRAPH)
          .join('')
          .trim()
      );
    }
    return groups;
  });
}

export default function DiaryEntryDetails({
  entry,
  onDelete,
  onEdit,
}: DiaryEntryDetailsProps) {
  const [isOpen, setOpenModal] = useState(false);

  const handleModalClick = (entry: string) => {
    onDelete?.(entry);
    ToastProvider.success('Запис видалено');
    setOpenModal(false);
  };

  if (!entry) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.placeholder}>
          Наразі записи у щоденнику відстні
        </p>
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
              onClick={() => setOpenModal(true)}
            >
              <div className={styles.btnInner}>
                <svg width={24} height={24}>
                  <use href="/sprite.svg#icon-delete_forever" />
                </svg>
              </div>
            </button>
          )}
        </div>
      </header>

      <div className={styles.content}>
        <div className={styles.body}>
          {splitIntoParagraphs(entry.description).map((paragraph, i) => (
            <p key={i} className={styles.text}>
              {paragraph}
            </p>
          ))}
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
      </div>
      <ConfirmationModal
        isOpen={isOpen}
        title={'Видалити'}
        confirmButtonText={'Видалити'}
        cancelButtonText={'Відмінити'}
        onConfirm={() => handleModalClick(entry._id)}
        onCancel={() => {
          setOpenModal(false);
        }}
      />
    </div>
  );
}
