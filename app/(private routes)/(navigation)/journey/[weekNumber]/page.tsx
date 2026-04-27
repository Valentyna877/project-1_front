import JourneyPageClient from "@/components/journey/JourneyPageClient/JourneyPageClient";

interface JourneyWeekPageProps {
  params: Promise<{ weekNumber: string }>;
}

const TOTAL_WEEKS = 40;

export default async function JourneyWeekPage({
  params,
}: JourneyWeekPageProps) {
  const { weekNumber } = await params;
  const week = Math.max(1, Math.min(TOTAL_WEEKS, Number(weekNumber)));

  return <JourneyPageClient weekNumber={week} />;
}
