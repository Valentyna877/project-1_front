'use client';
import { FieldProps } from 'formik';
import DatePicker from 'react-datepicker';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';
import { IMask, IMaskInput } from 'react-imask';

interface CalendarDatePickerProps extends FieldProps {
  onDateSelect?: (dateStr: string) => void;
  placeholderText?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  label?: string;
  labelClassName?: string;
}

const CalendarDatePicker: React.FC<CalendarDatePickerProps> = ({
  form,
  field,
  minDate,
  maxDate,
  onDateSelect,
  label,
  labelClassName,
  ...props
}) => {
  const dateValue = field.value ? new Date(field.value) : null;

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
      {label && <label htmlFor={field.name} className={labelClassName}>{label}</label>}
      <DatePicker
        id={field.name}
        {...props}
        selected={dateValue}
        onChange={handleChange}
        minDate={minDate}
        maxDate={maxDate}
        onCalendarClose={() => form.setFieldTouched(field.name, true)}
        customInput={
          <IMaskInput
              mask="DD-MM-YYYY"
              blocks={{
                  DD: { mask: IMask.MaskedRange, from: 1, to: 31 },
                  MM: { mask: IMask.MaskedRange, from: 1, to: 12 },
                  YYYY: { mask: IMask.MaskedRange, from: new Date().getFullYear(), to: new Date().getFullYear() + 1 },
              }}
              onAccept={(value: string) => {
                  if (value.length === 10) {
                      const [dd, mm, yyyy] = value.split('-');
                      const dateString = `${yyyy}-${mm}-${dd}`;
                      form.setFieldValue(field.name, dateString);
                  }
              }}
              onBlur={() => form.setFieldTouched(field.name, true)}
          />
      }
      />
    </>
  );
};

export default CalendarDatePicker;