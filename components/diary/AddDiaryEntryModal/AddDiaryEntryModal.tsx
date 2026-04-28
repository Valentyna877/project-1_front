"use client";

import Modal from "@/components/common/Modal/Modal";
import { AddDiaryEntryForm } from "../AddDiaryEntryForm/AddDiaryEntryForm";
import css from "./AddDiaryEntryModal.module.css";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  isEditing?: boolean;
}

const AddDiaryEntryModal = ({ isOpen, onClose, isEditing = false }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className={css.container}>
        <h2 className={css.title}>
          {isEditing ? "Редагувати запис" : "Новий запис"}
        </h2>

        <AddDiaryEntryForm onSuccess={onClose} />
      </div>
    </Modal>
  );
};

export default AddDiaryEntryModal;
