'use client';

import Modal from '@/components/common/Modal/Modal';
import AddDiaryEntryForm from '@/components/diary/AddDiaryEntryForm/AddDiaryEntryForm';
import css from './AddDiaryEntryModal.module.css';
import { useQuery } from '@tanstack/react-query';
import { getAllEmotions } from '@/lib/api/clientApi';

type Option = {
  value: string;
  label: string;
};

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isEditing?: boolean;
  options?: Option[];
}

const AddDiaryEntryModal = ({
  isOpen,
  onClose,
  isEditing = false,
  // options,
}: Props) => {
  const { data } = useQuery({
    queryKey: ['emotions'],
    queryFn: getAllEmotions,
  });
  const options =
    data?.map((option) => ({
      value: option.title,
      label: option.title,
    })) || [];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.container}>
        <h2 className={css.title}>
          {isEditing ? 'Редагувати запис' : 'Новий запис'}
        </h2>

        <AddDiaryEntryForm onSuccess={onClose} options={options} />
      </div>
    </Modal>
  );
};

export default AddDiaryEntryModal;
