"use client";

import { useState, useRef, useEffect } from "react";
import clsx from "clsx";
import css from "./MultiSelect.module.css";
// отримувати через пропс ?
const categoriesData = [
  { id: "6895bd86a5c677999ed2ae14", title: "Апатія" },
  { id: "6895bd86a5c677999ed2ae15", title: "Апетит" },
  { id: "6895bd86a5c677999ed2ae16", title: "Бадьорість" },
  { id: "6895bd86a5c677999ed2ae23", title: "Вдячність" },
  { id: "6895bd86a5c677999ed2aeb9", title: "Тривога" },
  { id: "6895bd86a5c677999ed2aec5", title: "Щастя" },
  // ...
];

interface MultiSelectProps {
  name: string;
  value: string[]; // Масив обраних title або ID
  onChange: (value: string[]) => void;
}

const MultiSelect = ({ value, onChange }: MultiSelectProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleOption = (title: string) => {
    const newValue = value.includes(title)
      ? value.filter((item) => item !== title)
      : [...value, title];
    onChange(newValue);
  };

  const filteredOptions = categoriesData.filter((option) =>
    option.title.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className={css.container} ref={containerRef}>
      <div
        className={clsx(css.selectTrigger, isOpen && css.active)}
        onClick={() => setIsOpen(!isOpen)}>
        <div className={css.tagsContainer}>
          {value.length > 0 ? (
            value.map((val) => (
              <span key={val} className={css.tag}>
                {val}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleOption(val);
                  }}
                  className={css.removeTag}>
                  ×
                </button>
              </span>
            ))
          ) : (
            <span className={css.placeholder}>Оберіть категорію</span>
          )}
        </div>
        <svg
          className={clsx(css.arrow, isOpen && css.rotate)}
          width="20"
          height="20">
          <use href="/sprite.svg#icon-chevron-down" />
        </svg>
      </div>

      {isOpen && (
        <div className={css.dropdown}>
          <input
            type="text"
            className={css.searchInput}
            placeholder="Пошук..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
          />
          <ul className={css.optionsList}>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option.id}
                  className={css.optionItem}
                  onClick={() => toggleOption(option.title)}>
                  <input
                    type="checkbox"
                    checked={value.includes(option.title)}
                    readOnly
                    className={css.checkbox}
                  />
                  <span className={css.optionTitle}>{option.title}</span>
                </li>
              ))
            ) : (
              <li className={css.noOptions}>Нічого не знайдено</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
