'use client';

import Button from '@/components/common/Button/Button';
import css from './FeelingCheckCard.module.css';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';

export default function FeelingCheckCard() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const handleDiaryRedirect = () => {
    if (isAuthenticated) {
      router.push('/diary?modal=isOpen');
    } else {
      router.replace('/auth/login');
    }
  };

  return (
    <div className={css.feelingCheckCardBox}>
      <h2>Як ви себе почуваєте?</h2>
      <p className={css.feelingSubtitle}>Рекомендація на сьогодні:</p>
      <p className={css.feelingText}>Занотуйте незвичні відчуття у тілі.</p>
      <Button className={css.feelingBtn} onClick={handleDiaryRedirect}>
        Зробити запис у щоденник
      </Button>
    </div>
  );
}
