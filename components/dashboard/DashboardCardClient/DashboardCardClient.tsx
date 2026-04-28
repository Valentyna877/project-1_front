"use client";

import { useQuery } from "@tanstack/react-query";
import BabyTodayCard from "../BabyTodayCard/BabyTodayCard";
import MomTipCard from "../MomTipCard/MomTipCard";
import StatusBlock from "../StatusBlock/StatusBlock";
import { weekInfo, weekInfoPublic } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import Loader from "@/components/common/Loader/Loader";

export default function DashboardCardClient() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["weeks", isAuthenticated],
    queryFn: isAuthenticated ? weekInfo : weekInfoPublic,
    refetchOnMount: false,
  });

  const todayIndex = (new Date().getDay() + 6) % 7;

  if (!data) {
    return <Loader />;
  }

  if (!data.baby) {
    return "Error...";
  }

  const momDailyTips = data?.baby?.momDailyTips;

  if (isLoading) {
    return "Loading...";
  }

  if (isError) {
    return "Error";
  }

  return (
    <>
      <StatusBlock weeks={data?.weeks} days={data?.days} />
      <BabyTodayCard
        imageAlt={data.baby.imageAlt}
        image={data.baby?.image}
        analogy={data.baby?.analogy}
        babySize={data.baby?.babySize}
        babyWeight={data.baby?.babyWeight}
        babyActivity={data.baby?.babyActivity}
        babyDevelopment={data.baby?.babyDevelopment}
      />
      <MomTipCard momDailyTips={momDailyTips[todayIndex]} />
    </>
  );
}
