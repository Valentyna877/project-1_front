'use client';

import css from './AddTaskForm.module.css';
import { useId } from 'react';
import {
  Formik,
  Form,
  Field,
  type FormikHelpers,
  ErrorMessage,
  FieldProps,
} from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask, NewTask } from '@/lib/api/clientApi';
import Button from '@/components/common/Button/Button';
import CalendarDatePicker from '@/components/common/CalendarDatePicker/CalendarDatePicker';
import { toast } from 'sonner';

interface TaskFormProps {
  onClose?: () => void;
}

interface AddTaskFormValues {
  name: string;
  date: string;
}

const initialValues: AddTaskFormValues = {
  name: '',
  date: new Date().toISOString().split('T')[0],
};

const today = new Date();

const AddTaskFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Назва має містити хоча б 1 символ')
    .max(96, 'Назва занадто довга')
    .required("Обов'язкове поле"),
  date: Yup.string()
    .trim()
    .test('is-valid-date', 'Невірний формат дати', (value) => {
      if (!value) return false;
      const date = new Date(value);
      return !isNaN(date.getTime());
    })
    .matches(/^\d{4}-\d{2}-\d{2}$/, 'Неправильний формат дати'),
});

export default function AddTaskForm({ onClose }: TaskFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      toast.success('Завдання успішно створено!');
      if (onClose) {
        onClose();
      }
    },
    onError: () => {
      toast.error('Помилка при створенні завдання. Спробуйте ще раз.');
    },
  });

  const handleSubmit = (
    values: AddTaskFormValues,
    actions: FormikHelpers<AddTaskFormValues>
  ) => {
    const taskToSend: NewTask = {
      name: values.name,
      date: values.date,
      isDone: false,
    };
    mutation.mutate(taskToSend);
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={AddTaskFormSchema}
    >
      <Form className={css.addTaskForm}>
        <fieldset>
          <div className={css.addTaskformGroup}>
            <label htmlFor={`${fieldId}-name`}>Назва завдання</label>
            <Field name="name">
              {({ field, meta }: FieldProps) => {
                const hasError = meta.touched && !!meta.error;
                return (
                  <>
                    <input
                      {...field}
                      type="text"
                      id={`${fieldId}-name`}
                      placeholder="Введіть назву завдання"
                      className={`${css.addTaskFormInput} ${hasError ? css['input-error'] : ''}`}
                    />
                    {hasError && <span className={css.span}>{meta.error}</span>}
                  </>
                );
              }}
            </Field>
          </div>

          <div className={css.addTaskformGroup}>
            <label htmlFor={`${fieldId}-date`}>Дата</label>
            <Field
              name="date"
              component={CalendarDatePicker}
              id={`${fieldId}-date`}
              placeholderText={today}
              className={css.addTaskFormInput}
              minDate={today}
              dateFormat="dd-MM-yyyy"
            />
            <ErrorMessage name="date" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <Button
              variant="normal"
              size="lg"
              type="submit"
              disabled={mutation.isPending}
              loadingText="Зберігається..."
              isLoading={mutation.isPending}
              className={css.addTaskFormButton}
            >
              Зберегти
            </Button>
          </div>
        </fieldset>
      </Form>
    </Formik>
  );
}
