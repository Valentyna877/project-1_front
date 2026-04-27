"use client";

import { useEffect, useState } from "react";

import styles from "./page.module.css";
import {
  createDiary,
  CreateDiaryDto,
  deleteDiary,
  DiaryEntry,
  getDiaries,
  updateDiary,
} from "@/lib/api/diaryApi";
import DiaryList from "@/components/diary/DiaryList/DiaryList";
import DiaryEntryDetails from "@/components/diary/DiaryEntryDetails/DiaryEntryDetails";

export default function DiaryPage() {
  const [entries, setEntries] = useState<DiaryEntry[]>([]);
  const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEntry, setEditingEntry] = useState<DiaryEntry | null>(null);
  const [isSaving, setIsSaving] = useState(false);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [emotions, setEmotions] = useState("");

  useEffect(() => {
    getDiaries()
      .then((data) => {
        setEntries(data);
        setSelectedEntry(data[0] ?? null);
      })
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, []);

  const openCreateModal = () => {
    setEditingEntry(null);
    setTitle("");
    setDescription("");
    setDate(new Date().toISOString().split("T")[0]);
    setEmotions("");
    setIsModalOpen(true);
  };

  const openEditModal = (entry: DiaryEntry) => {
    setEditingEntry(entry);
    setTitle(entry.title);
    setDescription(entry.description);
    setDate(entry.date);
    setEmotions(entry.emotions.join(", "));
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
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean),
    };

    setIsSaving(true);
    try {
      if (editingEntry) {
        const updated = await updateDiary(editingEntry.id, payload);
        setEntries((prev) =>
          prev.map((e) => (e.id === updated.id ? updated : e)),
        );
        setSelectedEntry(updated);
      } else {
        const created = await createDiary(payload);
        setEntries((prev) => [created, ...prev]);
        setSelectedEntry(created);
      }
      closeModal();
    } catch (error) {
      console.error("Failed to save entry:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteDiary(id);
      const updated = entries.filter((e) => e.id !== id);
      setEntries(updated);
      setSelectedEntry(updated[0] ?? null);
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  return (
    <div className={styles.page}>
      <h1 className={styles.greeting}>Good morning, Anna!</h1>

      {isLoading ? (
        <p className={styles.loading}>Loading...</p>
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
          <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
            <h2 className={styles.modalTitle}>
              {editingEntry ? "Edit entry" : "New entry"}
            </h2>

            <div className={styles.field}>
              <label className={styles.label}>Title</label>
              <input
                className={styles.input}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter a title"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Description</label>
              <textarea
                className={styles.textarea}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="What happened today?"
                rows={5}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Date</label>
              <input
                className={styles.input}
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Emotions (comma separated)</label>
              <input
                className={styles.input}
                value={emotions}
                onChange={(e) => setEmotions(e.target.value)}
                placeholder="joy, inspiration, calm"
              />
            </div>

            <div className={styles.modalActions}>
              <button
                className={styles.cancelBtn}
                onClick={closeModal}
                type="button"
              >
                Cancel
              </button>
              <button
                className={styles.submitBtn}
                onClick={handleSubmit}
                disabled={isSaving}
                type="button"
              >
                {isSaving ? "Saving..." : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
