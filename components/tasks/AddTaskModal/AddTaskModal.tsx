import css from './AddTaskModal.module.css';
import Modal from '@/components/common/Modal/Modal';
import AddTaskForm from '../AddTaskForm/AddTaskForm';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      showCloseButton={true}
      modalClassName={css.addTaskModal}
    >
      <h2 className={css.addTaskModalTitle}>Нове завдання</h2>
      <div className={css.addTaskModalForm}>
        <AddTaskForm onClose={onClose} />
      </div>
    </Modal>
  );
}
