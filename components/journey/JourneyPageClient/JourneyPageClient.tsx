"use client";

import WeekSelector from "../WeekSelector/WeekSelector";
import JourneyDetails from "../JourneyDetails/JourneyDetails";
import PageTitle from "@/components/common/GreetingBlock/GreetingBlock";
import { useTheme } from "@/hooks/useTheme";
import styles from "./JourneyPageClient.module.css";

interface JourneyPageClientProps {
  weekNumber: number;
  currentWeek: number;
}

const JourneyPageClient = ({
  weekNumber,
  currentWeek,
}: JourneyPageClientProps) => {
  const { themeClass } = useTheme();

  return (
    <div className={`${styles.wrapper} ${styles[themeClass]}`}>
      <PageTitle />
      <WeekSelector currentWeek={currentWeek} activeWeek={weekNumber} />
      <JourneyDetails weekNumber={weekNumber} />
    </div>
  );
};

export default JourneyPageClient;
