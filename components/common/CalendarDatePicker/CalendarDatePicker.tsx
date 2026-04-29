'use client';

import { useField } from 'formik';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './CalendarDatePicker.module.css';

interface CalendarDatePickerProps {
  minDate: Date;
  maxDate: Date;
  textLabel?: string;
  placeHolderText?: string;
  className?: string;
}

export default function CalendarDatePicker({
  minDate,
  maxDate,
  textLabel,
  placeHolderText,
  className,
}: CalendarDatePickerProps) {
  const [field, , helpers] = useField('dueDate');
  return (
    <div className={css.dateWrapper}>
      <label className={css.label} htmlFor="dueDate">
        {textLabel || 'Планова дата пологів'}
      </label>
      <DatePicker
        className={css.placeholder || className}
        id="dueDate"
        selected={field.value ? new Date(field.value) : null}
        onChange={(date: Date | null) => helpers.setValue(date)}
        minDate={minDate}
        maxDate={maxDate}
        placeholderText={placeHolderText}
      />
    </div>
  );
}
