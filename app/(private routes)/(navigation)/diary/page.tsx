'use client';

import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import '@/app/globals.css';
import styles from './page.module.css';
import DiaryList from '@/components/diary/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';
import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
import { DiaryEntry } from '@/types/diary';
import { deleteDiary, getDiaries } from '@/lib/api/clientApi';
import { useDiaryStore } from '@/lib/store/diaryStore';
import { useTheme } from '@/hooks/useTheme';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export default function DiaryPage() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setEditingEntry, clearDraft } = useDiaryStore();
  const { themeClass } = useTheme();

  const { data: entries = [], isLoading } = useQuery<DiaryEntry[]>({
    queryKey: ['diary'],
    queryFn: getDiaries,
  });

  // const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(
    () => (entries.length > 0 ? entries[0] : null)
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  // useEffect(() => {
  //   if (entries.length > 0) {
  //     setSelectedEntry((prev) => prev ?? entries[0]);
  //   }
  // }, [entries]);

  const handleOpenCreate = () => {
    clearDraft();
    setIsModalOpen(true);
  };

  const handleOpenEdit = (entry: DiaryEntry) => {
    setEditingEntry(entry);
    setIsModalOpen(true);
  };

  const handleModalClose = (updatedEntry?: DiaryEntry) => {
    setIsModalOpen(false);
    router.replace('/diary');
    clearDraft();
    if (updatedEntry) {
      setSelectedEntry(updatedEntry);
    }
  };

  const handleDelete = async (entryId: string) => {
    if (!entryId) {
      toast.error('Не вдалося видалити: ID не знайдено');
      return;
    }

    try {
      await deleteDiary(entryId);
      queryClient.invalidateQueries({ queryKey: ['diary'] });

      if (selectedEntry?._id === entryId) {
        const updated = entries.filter((e) => e._id !== entryId);
        setSelectedEntry(updated[0] ?? null);
      }
    } catch (error) {
      console.error('Failed to delete entry:', error);
      toast.error('Помилка при видаленні');
    }
  };

  return (
    <div className="container">
      <div className={`${styles.page} ${styles[themeClass]}`}>
        <div className={styles.inner}>
          <GreetingBlock />

          {isLoading ? (
            <p className={styles.loading}>Завантаження...</p>
          ) : (
            <div className={styles.content}>
              <DiaryList
                entries={entries}
                selectedId={selectedEntry?._id ?? null}
                onSelect={setSelectedEntry}
                isModalOpen={isModalOpen}
                onModalOpen={handleOpenCreate}
                onModalClose={handleModalClose}
              />
              <div className={styles.detailsWrapper}>
                <DiaryEntryDetails
                  entry={selectedEntry}
                  onDelete={handleDelete}
                  onEdit={handleOpenEdit}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
