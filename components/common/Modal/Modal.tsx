'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import clsx from 'clsx';
import css from './Modal.module.css';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;

  showCloseButton?: boolean;
  closeOnBackdrop?: boolean;
  closeOnEsc?: boolean;

  modalClassName?: string;
  backdropClassName?: string;

  closeButtonClassName?: string;
  closeIconClassName?: string;
};

function Modal({
  isOpen,
  onClose,
  children,
  showCloseButton = true,
  closeOnBackdrop = true,
  closeOnEsc = true,
  modalClassName,
  backdropClassName,
  closeButtonClassName,
  closeIconClassName,
}: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (closeOnEsc && e.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', handleKeyDown);

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) return null;
  if (typeof document === 'undefined') return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!closeOnBackdrop) return;
    if (e.target === e.currentTarget) onClose();
  };

  return createPortal(
    <div
      className={clsx(css.backdrop, backdropClassName)}
      onClick={handleBackdropClick}
      role="presentation"
    >
      <div className={clsx(css.modal, modalClassName)} role="dialog" aria-modal="true">
        {showCloseButton && (
          <button
            type="button"
            className={clsx(css.closeButton, closeButtonClassName)}
            onClick={onClose}
            aria-label="Закрити діалогове вікно"
          >
            <svg
              className={clsx(css.closeIcon, closeIconClassName)}
              width="24"
              height="24"
              aria-hidden="true"
            >
              <use href="/sprite.svg#icon-close" />
            </svg>
          </button>
        )}

        <div className={css.content}>{children}</div>
      </div>
    </div>,
    document.body
  );
}

export default Modal;