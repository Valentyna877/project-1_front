'use client';

import { useQuery } from '@tanstack/react-query';
import MomTipCard from '../MomTipCard/MomTipCard';
import StatusBlock from '../StatusBlock/StatusBlock';
import { weekInfo, weekInfoPublic } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';
import Loader from '@/components/common/Loader/Loader';
import BabyTodayCard from '../BabyTodayCard/BabyTodayCard';
import ErrorState from '@/components/common/ErrorState/ErrorState';
import { useRouter } from 'next/navigation';

export default function DashboardCardClient() {
  const router = useRouter();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data, isLoading, isError } = useQuery({
    queryKey: ['weeks', isAuthenticated],
    queryFn: isAuthenticated ? weekInfo : weekInfoPublic,
  });

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    ToastProvider.error('Помилка при створенні завдання.');
  }

  if (!data?.baby) {
    return (
      <ErrorState
        title="Виникла помилка"
        description="Виникла помилка, спробуйте пізніше"
        reset={router.refresh}
      />
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
