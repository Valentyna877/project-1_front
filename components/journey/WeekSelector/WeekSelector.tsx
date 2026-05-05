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

    let isDown = false;
    let startX = 0;
    let startScroll = 0;
    let moved = false;

    const handleMouseDown = (e: MouseEvent) => {
      isDown = true;
      moved = false;
      startX = e.pageX - wrapper.offsetLeft;
      startScroll = wrapper.scrollLeft;
      wrapper.classList.add(styles.grabbing);
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      const walk = x - startX;
      if (Math.abs(walk) > 4) moved = true;
      wrapper.scrollLeft = startScroll - walk;
    };

    const stopDrag = () => {
      isDown = false;
      wrapper.classList.remove(styles.grabbing);
    };

    const handleClickCapture = (e: MouseEvent) => {
      if (moved) {
        e.preventDefault();
        e.stopPropagation();
        moved = false;
      }
    };

    wrapper.addEventListener("wheel", handleWheel, { passive: false });
    wrapper.addEventListener("mousedown", handleMouseDown);
    wrapper.addEventListener("mousemove", handleMouseMove);
    wrapper.addEventListener("mouseleave", stopDrag);
    window.addEventListener("mouseup", stopDrag);
    wrapper.addEventListener("click", handleClickCapture, true);

    return () => {
      wrapper.removeEventListener("wheel", handleWheel);
      wrapper.removeEventListener("mousedown", handleMouseDown);
      wrapper.removeEventListener("mousemove", handleMouseMove);
      wrapper.removeEventListener("mouseleave", stopDrag);
      window.removeEventListener("mouseup", stopDrag);
      wrapper.removeEventListener("click", handleClickCapture, true);
    };
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
