'use client';

import Modal from '@/components/common/Modal/Modal';
import AddDiaryEntryForm from '@/components/diary/AddDiaryEntryForm/AddDiaryEntryForm';
import css from './AddDiaryEntryModal.module.css';

// ////тимчасово
// const options = [
//   { value: 'Апатія', label: 'Апатія' },
//   { value: 'Апетит', label: 'Апетит' },
//   { value: 'Бадьорість', label: 'Бадьорість' },
// ];
// ////тимчасово передати емоції

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

const AddDiaryEntryModal = ({
  isOpen,
  onClose,
  isEditing = false,
  options,
}: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.container}>
        <button className={css.closeBtn} onClick={onClose}>
          <svg width={24} height={24}>
            <use href="/sprite.svg#icon-close" />
          </svg>
        </button>

        <h2 className={css.title}>
          {isEditing ? 'Редагувати запис' : 'Новий запис'}
        </h2>

        <AddDiaryEntryForm onSuccess={onClose} options={options} />
      </div>
    </Modal>
  );
};

export default AddDiaryEntryModal;
