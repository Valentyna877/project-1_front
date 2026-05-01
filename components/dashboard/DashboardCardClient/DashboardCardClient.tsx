'use client';

import { useQuery } from '@tanstack/react-query';
import BabyTodayCard from '../BabyTodayCard/BabyTodayCard';
import MomTipCard from '../MomTipCard/MomTipCard';
import StatusBlock from '../StatusBlock/StatusBlock';
import { weekInfo, weekInfoPublic } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';
import Loader from '@/components/common/Loader/Loader';
import ErrorState from '@/components/common/ErrorState/ErrorState';
import { useRouter } from 'next/router';

export default function DashboardCardClient() {
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

  const todayIndex = (new Date().getDay() + 6) % 7;
  const momDailyTip = data?.baby?.momDailyTips[todayIndex];

  return (
    <>
      <StatusBlock weeks={data?.weeks} days={data?.days} />
      <BabyTodayCard
        imageAlt={data?.baby?.imageAlt}
        image={data?.baby?.image}
        analogy={data?.baby?.analogy}
        babySize={data?.baby?.babySize}
        babyWeight={data?.baby?.babyWeight}
        babyActivity={data?.baby?.babyActivity}
        babyDevelopment={data?.baby?.babyDevelopment}
      />
      <MomTipCard momDailyTip={momDailyTip} />
    </>
  );
}
