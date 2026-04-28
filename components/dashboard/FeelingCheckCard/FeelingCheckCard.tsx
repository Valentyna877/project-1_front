'use client';

import Button from '@/components/common/Button/Button';
import css from './FeelingCheckCard.module.css';
import { redirect } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function FeelingCheckCard() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleDairyRedirect = () => {
    if (isAuthenticated) {
      redirect('/dairy');
    } else {
      redirect('/auth/login');
    }
  };

  return (
    <div className={css.feelingCheckCardBox}>
      <h2>Як ви себе почуваєте?</h2>
      <p className={css.feelingSubtitle}>Рекомендація на сьогодні:</p>
      <p className={css.feelingText}>Занотуйте незвичні відчуття у тілі.</p>
      <Button className={css.feelingBtn} onClick={handleDairyRedirect}>
        Зробити запис у щоденник
      </Button>
    </div>
  );
}
