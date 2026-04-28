import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { isAxiosError } from "axios";
import { api } from "@/app/api/api";
import { WeekInfo } from "@/types/weeks";
import JourneyPageClient from "@/components/journey/JourneyPageClient/JourneyPageClient";

interface JourneyWeekPageProps {
  params: Promise<{ weekNumber: string }>;
}

export default async function JourneyWeekPage({
  params,
}: JourneyWeekPageProps) {
  const { weekNumber } = await params;
  const week = Number(weekNumber);

  try {
    const cookieStore = await cookies();
    const res = await api.get<WeekInfo>("/weeks", {
      headers: { Cookie: cookieStore.toString() },
    });
    const currentWeek = res.data.weeks;

    return <JourneyPageClient weekNumber={week} currentWeek={currentWeek} />;
  } catch (error) {
    if (isAxiosError(error) && error.response?.status === 401) {
      redirect("/auth/login");
    }
    throw error;
  }
}
