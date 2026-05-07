'use client';

import { useQuery } from '@tanstack/react-query';
import MomTipCard from '../MomTipCard/MomTipCard';
import StatusBlock from '../StatusBlock/StatusBlock';
import { weekInfo, weekInfoPublic } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';
import Loader from '@/components/common/Loader/Loader';
import BabyTodayCard from '../BabyTodayCard/BabyTodayCard';
import css from '../MomTipCard/MomTipCard.module.css';
import { useTheme } from '@/hooks/useTheme';

export default function DashboardCardClient() {
  const { theme, themeClass } = useTheme();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['weeks', isAuthenticated],
    queryFn: isAuthenticated ? weekInfo : weekInfoPublic,
  });

  if (isLoading) {
    return <Loader theme={theme} />;
  }

  if (isError) {
    ToastProvider.error('Не вдалось завантажити завдання.');
  }

  if (!data?.baby) {
    return (
      <div
        className={`${css.momTipBox} ${css[themeClass]}`}
        style={{ marginTop: '16px' }}
      >
        <p className={css.momTipText}>Виникла помилка...</p>
      </div>
    );
  }

  const todayIndex = (new Date().getDay() + 6) % 7;
  const momDailyTip = data?.baby?.momDailyTips[todayIndex];
  const babyInfo = data?.baby;

  return (
    <>
      <StatusBlock weeks={data?.weeks} days={data?.days} />
      <BabyTodayCard babyInfo={babyInfo} />
      <MomTipCard momDailyTip={momDailyTip} />
    </>
  );
}
