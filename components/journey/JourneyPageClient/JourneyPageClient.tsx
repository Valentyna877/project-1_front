"use client";

import { useMemo } from "react";
import { LuChevronRight } from "react-icons/lu";
import { useAuthStore } from "@/lib/store/authStore";
import WeekSelector from "../WeekSelector/WeekSelector";
import JourneyDetails from "../JourneyDetails/JourneyDetails";
import styles from "./JourneyPageClient.module.css";

const ONE_WEEK_MS = 7 * 24 * 60 * 60 * 1000;
const TOTAL_WEEKS = 40;

const getGreetingPhrase = () => {
  const hour = new Date().getHours();
  if (hour >= 5 && hour < 12) return "Доброго ранку";
  if (hour >= 12 && hour < 18) return "Добрий день";
  return "Доброго вечора";
};

interface JourneyPageClientProps {
  weekNumber: number;
}

const JourneyPageClient = ({ weekNumber }: JourneyPageClientProps) => {
  const user = useAuthStore((state) => state.user);

  const currentWeek = useMemo(() => {
    if (!user?.date) return 1;
    const dueDate = new Date(user.date).getTime();
    const today = Date.now();
    const weeksRemaining = Math.ceil((dueDate - today) / ONE_WEEK_MS);
    return Math.max(
      1,
      Math.min(TOTAL_WEEKS, TOTAL_WEEKS - weeksRemaining),
    );
  }, [user?.date]);

  const greeting = getGreetingPhrase();
  const name = user?.name?.trim();

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <nav className={styles.breadcrumbs} aria-label="Хлібні крихти">
          <span className={styles.crumb}>Лелека</span>
          <LuChevronRight aria-hidden className={styles.crumbIcon} />
          <span className={`${styles.crumb} ${styles.crumbActive}`}>
            Подорож
          </span>
        </nav>

        <h1 className={styles.title}>
          {greeting}
          {name ? `, ${name}` : ""}!
        </h1>
      </header>

      <WeekSelector currentWeek={currentWeek} activeWeek={weekNumber} />
      <JourneyDetails weekNumber={weekNumber} />
    </div>
  );
};

export default JourneyPageClient;
