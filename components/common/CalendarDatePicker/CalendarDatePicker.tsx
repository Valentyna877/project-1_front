'use client';
import { FieldProps } from 'formik';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

interface CalendarDatePickerProps extends FieldProps {
  onDateSelect?: (dateStr: string) => void;
  placeholderText?: string;
  className?: string;
  disabled?: boolean;
}

const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({
  form,
  field,
  onDateSelect,
  ...props
}) => {
  const dateValue = field.value ? new Date(field.value) : null;

  const handleChange = (date: Date | null) => {
    if (date) {
      const dateString = format(date, 'yyyy-MM-dd');
      form.setFieldValue(field.name, dateString);
      if (onDateSelect) {
        onDateSelect(dateString);
      }
    } else {
      form.setFieldValue(field.name, '');
    }
  };

  return (
    <DatePicker
      {...props}
      id={field.name}
      dateFormat="yyyy-MM-dd"
      selected={dateValue}
      onChange={handleChange}
      minDate={new Date()}
    />
  );
};

export default CalendarDatePicker;