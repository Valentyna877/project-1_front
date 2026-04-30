// 'use client';

// import { useEffect, useState } from 'react';
// import { useParams } from 'next/navigation';
// import { useRouter } from 'next/navigation';
// import styles from './page.module.css';
// import DiaryEntryDetails from '@/components/diary/DiaryEntryDetails/DiaryEntryDetails';
// import { DiaryEntry } from '@/types/diary';
// import { deleteDiary, getDiary } from '@/lib/api/clientApi';
// import ConfirmationModal from '@/components/common/ConfirmationModal/ConfirmationModal';
// import { toast } from 'sonner';
// import { useMutation } from '@tanstack/react-query';

// export default function DiaryEntryPage() {
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const { entryId } = useParams<{ entryId: string }>();
//   const router = useRouter();
//   const [entry, setEntry] = useState<DiaryEntry | null>(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [entries, setEntries] = useState<DiaryEntry[]>([]);
//   const [selectedEntry, setSelectedEntry] = useState<DiaryEntry | null>(null);

//   // const deleteMutation = useMutation({
//   //   mutationFn: deleteDiary,
//   //   onSuccess: () => {
//   //     console.log('success');
//   //   },
//   //   onError: () => {
//   //     console.log('error');
//   //   },
//   // });
//   // const handleDelete = (entryId: string) => {
//   //   deleteMutation.mutate(entryId);
//   // };

//   // const [removeEntry, setRemoveEntry] = useState(false);

//   useEffect(() => {
//     getDiary(entryId)
//       .then(setEntry)
//       .catch(console.error)
//       .finally(() => setIsLoading(false));
//   }, [entryId]);

//   const handleDeleteClick = () => {
//     setIsDeleteModalOpen(true);
//   };

//   const handleDelete = async (entryId: string) => {
//     try {
//       await deleteDiary(entryId);
//       console.log(entryId);

//       const updated = entries.filter((e) => e.id !== entryId);
//       console.log(updated);

//       setEntries(updated);

//       setSelectedEntry(updated[0] ?? null);
//     } catch (error) {
//       console.error('Failed to delete entry:', error);
//     }
//   };

//   // const handleDelete = async (id: string) => {
//   //   try {
//   //     await deleteDiary(id);
//   //     router.push('/diary');
//   //     toast.success('Запис видалено');
//   //   } catch {
//   //     toast.error('Не вдалося видалити. Спробуйте пізніше');
//   //   }
//   // };

//   // const handleConfirmDelete = async () => {
//   //   try {
//   //     await removeEntry(entryId);
//   //   } catch (error) {}
//   // };

//   // const handleDelete = async (entryId: string) => {
//   //   try {
//   //     await deleteDiary(entryId);
//   //     console.log(entryId);

//   //     const updated = entries.filter((e) => e.id !== entryId);
//   //     console.log(updated);

//   //     setEntries(updated);

//   //     setSelectedEntry(updated[0] ?? null);
//   //   } catch (error) {
//   //     console.error('Failed to delete entry:', error);
//   //   }
//   // };

//   if (isLoading) return <p className={styles.loading}>Завантаження...</p>;

//   return (
//     <div className={styles.page}>
//       <DiaryEntryDetails entry={entry} onDelete={handleDelete} />
//       <ConfirmationModal
//         isOpen={isDeleteModalOpen}
//         title="Ви точно хочете видалити?"
//         confirmButtonText="Видалити"
//         cancelButtonText="Скасувати"
//         onConfirm={handleDeleteClick}
//         onCancel={() => {
//           setIsDeleteModalOpen(false);
//         }}
//         // confirmButtonVariant={}
//       />
//     </div>
//   );
// }
