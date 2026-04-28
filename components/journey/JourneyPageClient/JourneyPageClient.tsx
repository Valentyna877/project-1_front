"use client";

import WeekSelector from "../WeekSelector/WeekSelector";
import JourneyDetails from "../JourneyDetails/JourneyDetails";
import styles from "./JourneyPageClient.module.css";

interface JourneyPageClientProps {
  weekNumber: number;
  currentWeek: number;
}

const JourneyPageClient = ({
  weekNumber,
  currentWeek,
}: JourneyPageClientProps) => {
  return (
    <div className={styles.wrapper}>
      <WeekSelector currentWeek={currentWeek} activeWeek={weekNumber} />
      <JourneyDetails weekNumber={weekNumber} />
    </div>
  );
};

export default JourneyPageClient;
