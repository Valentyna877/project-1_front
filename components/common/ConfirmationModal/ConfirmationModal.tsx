'use client';

import Modal from '@/components/common/Modal/Modal';
import Button from '@/components/common/Button/Button';
import css from './ConfirmationModal.module.css';

type ButtonVariant = 'normal' | 'cancel' | 'delete' | 'logout';

type ConfirmationModalProps = {
  isOpen: boolean;
  title: string;
  confirmButtonText: string;
  cancelButtonText: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmButtonVariant?: ButtonVariant;
};

function ConfirmationModal({
  isOpen,
  title,
  confirmButtonText,
  cancelButtonText,
  onConfirm,
  onCancel,
  confirmButtonVariant = 'cancel',
}: ConfirmationModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onCancel}
      modalClassName={css.confirmationModal}
      closeButtonClassName={css.confirmationCloseButton}
      closeIconClassName={css.confirmationCloseIcon}
    >
      <p className={css.confirmationModalTitle}>{title}</p>

      <div className={css.confirmationModalActions}>
        <Button
          type="button"
          variant="normal"
          onClick={onCancel}
          className={css.confirmationModalButton}
        >
          {cancelButtonText}
        </Button>

        <Button
          type="button"
          variant="cancel"
          onClick={onConfirm}
          className={css.confirmationModalButton}
        >
          {confirmButtonText}
        </Button>
      </div>
    </Modal>
  );
}

export default ConfirmationModal;