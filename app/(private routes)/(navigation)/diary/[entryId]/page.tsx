'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import styles from './page.module.css';
import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';
import AddDiaryEntryModal from '@/components/diary/AddDiaryEntryModal/AddDiaryEntryModal';
import { DiaryEntry } from '@/types/diary';
import { deleteDiary, getDiary } from '@/lib/api/clientApi';
import { useDiaryStore } from '@/lib/store/diaryStore';
import { toast } from 'sonner';

export default function DiaryEntryPage() {
  const { entryId } = useParams<{ entryId: string }>();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { setEditingEntry, clearDraft } = useDiaryStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: entry, isLoading } = useQuery<DiaryEntry>({
    queryKey: ['diary', entryId],
    queryFn: () => getDiary(entryId),
    enabled: !!entryId,
  });

  const handleDelete = async (id: string) => {
    try {
      await deleteDiary(id);
      toast.success('Запис видалено');
      queryClient.invalidateQueries({ queryKey: ['diary'] });
      router.push('/diary');
    } catch {
      toast.error('Не вдалося видалити. Спробуйте пізніше');
    }
  };

  const handleEdit = (e: DiaryEntry) => {
    setEditingEntry(e);
    setIsModalOpen(true);
  };

  const handleModalClose = (updated?: DiaryEntry) => {
    setIsModalOpen(false);
    clearDraft();
    if (updated) {
      queryClient.setQueryData(['diary', entryId], updated);
      queryClient.invalidateQueries({ queryKey: ['diary'] });
    }
  };

  if (isLoading) return <p className={styles.loading}>Завантаження...</p>;

  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        <button className={styles.back} onClick={() => router.back()}>
          <svg width={24} height={24}>
            <use href="/sprite.svg#icon-arrow_back" />
          </svg>
          Назад
        </button>
        <div className={styles.entryWrapper}>
          <DiaryEntryDetails
            entry={entry}
            onDelete={handleDelete}
            onEdit={handleEdit}
          />
        </div>
      </div>
      <AddDiaryEntryModal isOpen={isModalOpen} onClose={handleModalClose} />
    </div>
  );
}
