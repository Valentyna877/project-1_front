'use client';

import Modal from '@/components/common/Modal/Modal';
import AddDiaryEntryForm from '@/components/diary/AddDiaryEntryForm/AddDiaryEntryForm';
import css from './AddDiaryEntryModal.module.css';
import { useDiaryStore } from '@/lib/store/diaryStore';
import { DiaryEntry } from '@/types/diary';

interface Props {
  isOpen: boolean;
  onClose: (entry?: DiaryEntry) => void;
}

export default function AddDiaryEntryModal({ isOpen, onClose }: Props) {
  const { editingId } = useDiaryStore(); //  повернув як було раніше //

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => onClose()} 
      showCloseButton={true}
      modalClassName={css.addDiaryModal}
    >
      <h2 className={css.addDiaryModalTitle}>
        {editingId ? 'Редагувати запис' : 'Новий запис'}  
      </h2>

      <div className={css.addDiaryModalForm}>
        <AddDiaryEntryForm onSuccess={onClose} />
      </div>
    </Modal>
  );
}