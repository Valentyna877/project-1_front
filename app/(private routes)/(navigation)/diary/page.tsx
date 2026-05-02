'use client';

import { useEffect, useState } from 'react';

import styles from './page.module.css';

import DiaryList from '@/components/diary/DiaryList/DiaryList';
import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';
import GreetingBlock from '@/components/common/GreetingBlock/GreetingBlock';
import { CreateDiaryDto, DiaryEntry } from '@/types/diary';
import {
  createDiary,
  deleteDiary,
  getDiaries,
  updateDiary,
} from '@/lib/api/clientApi';
import { toast } from 'sonner';
import CreateDiaryModal from '@/components/diary/CreateDiaryModal/CreateDiaryModal';

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [emotions, setEmotions] = useState('');

  useEffect(() => {
    getDiaries()
      .then((data) => {
        const mappedData = data.map((entry: DiaryEntry) => ({
          ...entry,
          id: entry._id || entry.id,
        }));
        setEntries(mappedData);
        setSelectedEntry(mappedData[0] ?? null);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const openCreateModal = () => {
    setEditingEntry(null);
    setTitle('');
    setDescription('');
    setDate(new Date().toISOString().split('T')[0]);
    setEmotions('');
    setIsModalOpen(true);
  };

  const openEditModal = (entry: DiaryEntry) => {
    setEditingEntry(entry);
    setTitle(entry.title);
    setDescription(entry.description);
    setDate(entry.date);
    setEmotions(entry.emotions.join(', '));
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingEntry(null);
  };

  const handleSubmit = async () => {
    if (!title.trim() || !description.trim()) return;

    const payload: CreateDiaryDto = {
      title: title.trim(),
      description: description.trim(),
      date,
      emotions: emotions
        .split(',')
        .map((e) => e.trim())
        .filter(Boolean),
    };

    setIsSaving(true);
    try {
      if (editingEntry) {
        const updated = await updateDiary(editingEntry.id, payload);
        const mappedUpdated = { ...updated, id: updated._id || updated.id };
        setEntries((prev) =>
          prev.map((e) => (e.id === mappedUpdated.id ? mappedUpdated : e))
        );
        setSelectedEntry(mappedUpdated);
      } else {
        const created = await createDiary(payload);
        const mappedCreated = { ...created, id: created._id || created.id };
        setEntries((prev) => [mappedCreated, ...prev]);
        setSelectedEntry(mappedCreated);
      }
      closeModal();
    } catch (error) {
      console.error('Failed to save entry:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (entryId: string) => {
    const idToDelete = entryId || selectedEntry?.id;

    if (!idToDelete) {
      toast.error('Не вдалося видалити: ID не знайдено');
      return;
    }

    try {
      await deleteDiary(idToDelete);

      const updated = entries.filter((e) => e.id !== idToDelete);

      setEntries(updated);

      setSelectedEntry(updated[0] ?? null);
    } catch (error) {
      console.error('Failed to delete entry:', error);
    }
  };

  return (
    <div className={styles.page}>
      <GreetingBlock />

      {isLoading ? (
        <p className={styles.loading}>Завантаження...</p>
      ) : (
        <div className={styles.content}>
          <DiaryList
            entries={entries}
            selectedId={selectedEntry?.id ?? null}
            onSelect={setSelectedEntry}
            onAddClick={openCreateModal}
          />
          <div className={styles.detailsWrapper}>
            <DiaryEntryDetails
              entry={selectedEntry}
              onDelete={handleDelete}
              onEdit={openEditModal}
            />
          </div>
        </div>
      )}

      {isModalOpen && (
        <div className={styles.backdrop} onClick={closeModal}>
          <CreateDiaryModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onSuccess={(entry) => {
              const mapped = { ...entry, id: entry._id || entry.id };
              setEntries((prev) => [mapped, ...prev]);
              setSelectedEntry(mapped);
            }}
          />
        </div>
      )}
    </div>
  );
}
