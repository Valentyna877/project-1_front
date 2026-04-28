"use client";

import { useField } from "formik";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import css from "./CalendarDatePicker.module.css";

interface CalendarDatePickerProps {
  minDate: Date;
  maxDate: Date;
}

export default function CalendarDatePicker({
  minDate,
  maxDate,
}: CalendarDatePickerProps) {
  const [field, , helpers] = useField("dueDate");
  return (
    <div className={css.dateWrapper}>
      <label className={css.label} htmlFor="dueDate">
        Планова дата пологів
      </label>
      <DatePicker
        className={css.placeholder}
        id="dueDate"
        selected={field.value ? new Date(field.value) : null}
        onChange={(date: Date | null) => helpers.setValue(date)}
        placeholderText="Оберіть дату пологів"
        minDate={minDate}
        maxDate={maxDate}
        placeholderText='Оберіть дату'
      />
    </div>
  );
}
