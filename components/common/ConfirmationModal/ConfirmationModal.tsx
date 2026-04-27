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
    confirmButtonVariant = 'normal',
}: ConfirmationModalProps) {
return (
    <Modal
        isOpen={isOpen}
        onClose={onCancel}
        showCloseButton={false}
        modalClassName={css.confirmationModal}
    >
        <p className={css.confirmationModalTitle}>{title}</p>

        <div className={css.confirmationModalActions}>
        <Button
            type="button"
            variant="cancel"
            size="sm"
            onClick={onCancel}
            className={css.confirmationModalButton}
        >
            {cancelButtonText}
        </Button>

        <Button
            type="button"
            variant={confirmButtonVariant}
            size="sm"
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