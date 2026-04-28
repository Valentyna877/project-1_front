import css from './AddTaskModal.module.css';
import Modal from '@/components/common/Modal/Modal';
import AddTaskForm from '../AddTaskForm/AddTaskForm';

interface AddTaskModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ isOpen, onClose }: AddTaskModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} showCloseButton={true}>
      <h2 className={css.addTaskTitle}>Нове завдання</h2>
      <AddTaskForm onClose={onClose} />
    </Modal>
  );
}