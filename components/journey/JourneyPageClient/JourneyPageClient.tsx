"use client";

import TasksReminderCard from "@/components/tasks/TasksReminderCard/TasksReminderCard";
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
      <div className={styles.body}>
        <div className={styles.main}>
          <JourneyDetails weekNumber={weekNumber} />
        </div>
        <aside className={styles.aside}>
          <TasksReminderCard />
        </aside>
      </div>
    </div>
  );
};

export default JourneyPageClient;
