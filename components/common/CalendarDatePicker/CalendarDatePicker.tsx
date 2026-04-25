import { Field } from "formik";

interface CalendarDatePickerProps{
    minDate: string;
    maxDate: string;
}

export default function CalendarDatePicker({minDate, maxDate}:CalendarDatePickerProps) {
    return (
        <Field type='date' name='dueDate' min={minDate} max={maxDate} />
    )
}