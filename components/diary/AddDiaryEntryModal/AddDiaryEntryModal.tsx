'use client';

import Modal from '@/components/common/Modal/Modal';
import AddDiaryEntryForm from '@/components/diary/AddDiaryEntryForm/AddDiaryEntryForm';
import css from './AddDiaryEntryModal.module.css';

type Option = {
  value: string;
  label: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isEditing?: boolean;
  options: Option[];
}

const AddDiaryEntryModal = ({ isOpen, onClose, options }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.container}>
        <h2 className={css.title}>Новий запис</h2>

        <AddDiaryEntryForm onSuccess={onClose} options={options} />
      </div>
    </Modal>
  );
};

export default AddDiaryEntryModal;
