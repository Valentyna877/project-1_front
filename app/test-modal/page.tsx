'use client';

import { useState } from 'react';
import ConfirmationModal from '@/components/common/ConfirmationModal/ConfirmationModal';

export default function TestModalPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ padding: '40px' }}>
      <button onClick={() => setIsOpen(true)}>
        Відкрити модалку
      </button>

      <ConfirmationModal
        isOpen={isOpen}
        title="Ви точно хочете вийти?"
        confirmButtonText="Так"
        cancelButtonText="Ні"
        onConfirm={() => {
          console.log('CONFIRM');
          setIsOpen(false);
        }}
        onCancel={() => {
          console.log('CANCEL');
          setIsOpen(false);
        }}
      />
    </div>
  );
}