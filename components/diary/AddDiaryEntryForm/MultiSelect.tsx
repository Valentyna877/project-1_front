"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import styles from "./AddDiaryEntryForm.module.css";

export type EmotionDTO = { _id: string; title: string };

type MultiSelectProps = {
  placeholder: string;
  options: EmotionDTO[];
  value: string[]; // ids
  disabled?: boolean;
  onChange: (next: string[]) => void;
};

export default function MultiSelect({
  placeholder,
  options,
  value,
  disabled,
  onChange,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const selectedTitles = useMemo(() => {
    if (value.length === 0) return [];
    const map = new Map(options.map((o) => [o._id, o.title] as const));
    return value.map((id) => map.get(id)).filter((t): t is string => typeof t === "string");
  }, [options, value]);

  const toggle = (id: string) => {
    const next = value.includes(id) ? value.filter((x) => x !== id) : [...value, id];
    onChange(next);
  };

  return (
    <div className={styles.dropdownWrap} ref={wrapRef}>
      <button
        type="button"
        className={`${styles.dropdownControl} ${open ? styles.dropdownControlOpen : ""}`}
        onClick={() => !disabled && setOpen((s) => !s)}
        aria-expanded={open}
        disabled={disabled}
      >
        <span className={styles.dropdownValue}>
          {selectedTitles.length === 0 ? (
            <span className={styles.placeholder}>{placeholder}</span>
          ) : (
            <span className={styles.chips}>
              {selectedTitles.map((t) => (
                <span key={t} className={styles.chip}>
                  {t}
                </span>
              ))}
            </span>
          )}
        </span>

        <span className={`${styles.chevron} ${open ? styles.chevronOpen : ""}`} />
      </button>

      {open && !disabled && (
        <div className={styles.dropdownMenu}>
          <div className={styles.menuScroll}>
            {options.map((o) => {
              const checked = value.includes(o._id);

              return (
                <button
                  type="button"
                  key={o._id}
                  className={`${styles.menuItem} ${checked ? styles.menuItemActive : ""}`}
                  onClick={() => toggle(o._id)}
                >
                  <span className={`${styles.checkbox} ${checked ? styles.checkboxChecked : ""}`}>
                    {checked && <span className={styles.checkMark} />}
                  </span>
                  <span className={styles.itemLabel}>{o.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}