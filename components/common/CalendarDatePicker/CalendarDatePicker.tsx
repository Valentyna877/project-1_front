'use client';
import { FieldProps, useField } from 'formik';
import DatePicker from 'react-datepicker';
import { format, parseISO } from 'date-fns';
import { useEffect, useRef } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import css from './CalendarDatePicker.module.css';
import { useTheme, Theme } from '@/hooks/useTheme';
import MaskedDateInput from './MaskedDateInput';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';
import clsx from 'clsx';

interface CalendarDatePickerProps extends FieldProps {
  onDateSelect?: (dateStr: string) => void;
  placeholderText?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  label?: string;
  labelClassName?: string;
  themeOverride?: Theme;
}

const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({
  form,
  field,
  minDate,
  maxDate,
  onDateSelect,
  label,
  labelClassName,
  themeOverride,
  className,
  ...props
}) => {
  const { themeClass: globalThemeClass } = useTheme();
  const themeClass = themeOverride ? `theme-${themeOverride}` : globalThemeClass;
  const dateValue = field.value ? parseISO(field.value) : null;

  const [, meta] = useField(field.name);
  const hasError = Boolean(meta.touched && meta.error);

  const lastShownErrorRef = useRef<string | null>(null);

  useEffect(() => {
    if (hasError && meta.error && meta.error !== lastShownErrorRef.current) {
      ToastProvider.error(meta.error);
      lastShownErrorRef.current = meta.error;
    }
    if (!hasError) {
      lastShownErrorRef.current = null;
    }
  }, [hasError, meta.error]);

  const handleChange = (date: Date | null) => {
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      form.setFieldValue(field.name, dateString);
      if (onDateSelect) onDateSelect(dateString);
    } else {
      form.setFieldValue(field.name, '');
    }
  };

  return (
    <>
      {label && (
        <label htmlFor={field.name} className={labelClassName}>
          {label}
        </label>
      )}
      <div className={css.datePickerWrapper}>
        <DatePicker
          id={field.name}
          {...props}
          className={clsx(className, css.input, css[themeClass], hasError && css.inputError)}
          selected={dateValue}
          onChange={handleChange}
          minDate={minDate}
          maxDate={maxDate}
          fixedHeight
          calendarClassName={themeClass}
          popperClassName={themeClass}
          onCalendarClose={() => form.setFieldTouched(field.name, true)}
          showIcon
          icon={
            <svg width="20" height="20" aria-hidden="true">
              <use href="/sprite.svg#icon-today" />
            </svg>
          }
          customInput={
            <MaskedDateInput
              placeholder="дд.мм.рррр"
              onAcceptValue={(value) => {
                if (value.length === 10) {
                  const [dd, mm, yyyy] = value.split('.');
                  const dateString = `${yyyy}-${mm}-${dd}`;
                  queueMicrotask(() => {
                    form.setFieldValue(field.name, dateString);
                    form.setFieldTouched(field.name, true, false);
                  });
                }
              }}
            />
          }
        />
        {hasError && <span className={css.errorSpan}>{meta.error}</span>}
      </div>
    </>
  );
};

export default CalendarDatePicker;