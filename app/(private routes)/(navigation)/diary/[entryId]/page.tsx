"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { deleteDiary, DiaryEntry, getDiary } from "@/lib/api/diaryApi";
import DiaryEntryDetails from "@/components/diary/DiaryEntryDetails/DiaryEntryDetails";

export default function DiaryEntryPage() {
  const { entryId } = useParams<{ entryId: string }>();
  const router = useRouter();
  const [entry, setEntry] = useState<DiaryEntry | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getDiary(entryId)
      .then(setEntry)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [entryId]);

  const handleDelete = async (id: string) => {
    try {
      await deleteDiary(id);
      router.push("/diary");
    } catch (error) {
      console.error("Failed to delete entry:", error);
    }
  };

  if (isLoading) return <p className={styles.loading}>Loading...</p>;

  return (
    <div className={styles.page}>
      <DiaryEntryDetails entry={entry} onDelete={handleDelete} />
    </div>
  );
}
