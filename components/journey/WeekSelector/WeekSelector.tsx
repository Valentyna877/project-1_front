"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./WeekSelector.module.css";

const TOTAL_WEEKS = 40;

interface WeekSelectorProps {
  currentWeek: number;
  activeWeek: number;
}

const WeekSelector = ({ currentWeek, activeWeek }: WeekSelectorProps) => {
  const router = useRouter();
  const activeRef = useRef<HTMLButtonElement>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    if (!activeRef.current) return;
    activeRef.current.scrollIntoView({
      behavior: hasMountedRef.current ? "smooth" : "instant",
      block: "nearest",
      inline: "center",
    });
    hasMountedRef.current = true;
  }, [activeWeek]);

  const handleWeekClick = (week: number) => {
    if (week > currentWeek) return;
    router.push(`/journey/${week}`);
  };

  return (
    <div
      className={styles.wrapper}
      role="tablist"
      aria-label="Тижні вагітності"
    >
      {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map((week) => {
        const isFuture = week > currentWeek;
        const isActive = week === activeWeek;

        return (
          <button
            key={week}
            ref={isActive ? activeRef : undefined}
            type="button"
            role="tab"
            aria-selected={isActive}
            aria-current={isActive ? "page" : undefined}
            disabled={isFuture}
            onClick={() => handleWeekClick(week)}
            className={`${styles.week} ${isActive ? styles.active : ""} ${
              isFuture ? styles.future : ""
            }`}
          >
            <span className={styles.number}>{week}</span>
            <span className={styles.label}>Тиждень</span>
          </button>
        );
      })}
    </div>
  );
};

export default WeekSelector;
