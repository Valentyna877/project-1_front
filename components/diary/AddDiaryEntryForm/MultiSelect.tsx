'use client';

import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import css from './MultiSelect.module.css';

type Option = {
  value: string;
  label: string;
};

type MultiSelectProps = {
  value: string[];
  onChange: (value: string[]) => void;
  options: Option[];
};

export default function MultiSelect({
  value,
  onChange,
  options,
}: MultiSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelect = (val: string) => {
    if (value.includes(val)) {
      onChange(value.filter((v) => v !== val));
    } else {
      onChange([...value, val]);
    }
  };

  const handleRemove = (val: string) => {
    onChange(value.filter((v) => v !== val));
  };

  return (
    <div className={css.container} ref={containerRef}>
      <div
        className={clsx(css.selectTrigger, isOpen && css.active)}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={css.tagsContainer}>
          {value.length > 0 ? (
            value.map((val) => {
              const option = options.find((o) => o.value === val);
              return (
                <span key={val} className={css.tag}>
                  {option?.label}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleRemove(val);
                    }}
                  >
                    <svg width={12} height={12}>
                      <use href="/sprite.svg#icon-close" />
                    </svg>
                  </button>
                </span>
              );
            })
          ) : (
            <span className={css.placeholder}>Оберіть категорії</span>
          )}
        </div>

        <svg className={css.arrow} width={24} height={24}>
          <use href="/sprite.svg#icon-arrow_down" />
        </svg>
      </div>

      {isOpen && (
        <div className={css.dropdown}>
          <input
            type="text"
            placeholder="Пошук..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={css.search}
          />

          <ul className={css.optionsList}>
            {filteredOptions.map((option) => (
              <li
                key={option.value}
                className={css.option}
                onClick={() => handleSelect(option.value)}
              >
                <input
                  type="checkbox"
                  checked={value.includes(option.value)}
                  readOnly
                />
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
