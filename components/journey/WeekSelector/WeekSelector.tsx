"use client";

import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import styles from "./WeekSelector.module.css";

const TOTAL_WEEKS = 42;

interface WeekSelectorProps {
  currentWeek: number;
  activeWeek: number;
}

const WeekSelector = ({ currentWeek, activeWeek }: WeekSelectorProps) => {
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef<HTMLButtonElement>(null);
  const hasMountedRef = useRef(false);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const active = activeRef.current;
    if (!wrapper || !active) return;

    const wrapperRect = wrapper.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();
    const target =
      wrapper.scrollLeft +
      (activeRect.left - wrapperRect.left) -
      wrapper.clientWidth / 2 +
      active.clientWidth / 2;

    wrapper.scrollTo({
      left: target,
      behavior: hasMountedRef.current ? "smooth" : "auto",
    });
    hasMountedRef.current = true;
  }, [activeWeek]);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
      e.preventDefault();
      wrapper.scrollBy({ left: e.deltaY });
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    return () => wrapper.removeEventListener("wheel", handleWheel);
  }, []);

  const handleWeekClick = (week: number) => {
    if (week > currentWeek) return;
    router.push(`/journey/${week}`);
  };

  return (
    <div
      ref={wrapperRef}
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
