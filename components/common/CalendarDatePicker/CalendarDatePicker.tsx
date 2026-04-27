// 'use client';
// import { FieldProps } from 'formik';
// import DatePicker from 'react-datepicker';
// import { format } from 'date-fns';
// import 'react-datepicker/dist/react-datepicker.css';

// interface CalendarDatePickerProps extends FieldProps {
//   onDateSelect?: (dateStr: string) => void;
//   placeholderText?: string;
//   className?: string;
//   disabled?: boolean;
// }

// const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({
//   form,
//   field,
//   onDateSelect,
//   ...props
// }) => {
//   const dateValue = field.value ? new Date(field.value) : null;

//   const handleChange = (date: Date | null) => {
//     if (date) {
//       const dateString = format(date, 'yyyy-MM-dd');
//       form.setFieldValue(field.name, dateString);
//       if (onDateSelect) {
//         onDateSelect(dateString);
//       }
//     } else {
//       form.setFieldValue(field.name, '');
//     }
//   };

//   return (
//     <DatePicker
//       {...props}
//       id={field.name}
//       dateFormat="yyyy-MM-dd"
//       selected={dateValue}
//       onChange={handleChange}
//       minDate={new Date()}
//     />
//   );
// };

// export default CalendarDatePicker;


'use client'

import { useField } from "formik";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import css from './CalendarDatePicker.module.css'

interface CalendarDatePickerProps{
    minDate: Date;
    maxDate: Date;
}

export default function CalendarDatePicker({ minDate, maxDate }: CalendarDatePickerProps) {
    const [field, , helpers] = useField('dueDate');
    return (
        <div className={css.dateWrapper}>
            <label className={css.label} htmlFor="dueDate">Планова дата пологів</label>
            <DatePicker className={css.placeholder} id="dueDate" selected={field.value ? new Date(field.value) : null}
                onChange={(date: Date | null) => helpers.setValue(date)} minDate={minDate} maxDate={maxDate} />
        </div>
    )
}