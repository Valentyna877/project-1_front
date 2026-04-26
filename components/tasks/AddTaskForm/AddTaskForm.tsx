'use client';

import css from './AddTaskForm.module.css';
import { useId } from 'react';
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask, NewTask } from '@/lib/api/clientApi';

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

const AddTaskFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Назва має містити хоча б 1 символ')
    .max(96, 'Назва занадто довга')
    .required("Обов'язкове поле"),
  date: Yup.string().datetime('YYYY-MM-DD'),
});

export default function AddTaskForm({ onClose }: TaskFormProps) {
  const fieldId = useId();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks'] });
      onClose?.();
    },
  });

  const handleSubmit = (
    values: AddTaskFormValues,
    actions: FormikHelpers<AddTaskFormValues>,
  ) => {
    const taskToSend: NewTask = {
      ...values,
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
      <Form className={css.form}>
        <fieldset>
          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-name`}>Назва завдання</label>
            <Field
              id={`${fieldId}-name`}
              type="text"
              name="name"
              className={css.input}
            />
            <ErrorMessage name="name" component="span" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor={`${fieldId}-date`}>Дата</label>
            <Field
              id={`${fieldId}-date`}
              type="date"
              name="date"
              className={css.input}
            />
            <ErrorMessage name="date" component="span" className={css.error} />
          </div>

          <div className={css.actions}>
            <button
              type="submit"
              className={css.submitButton}
              disabled={mutation.isPending}
            >
              {mutation.isPending ? 'Зберігається...' : 'Зберегти'}
            </button>
          </div>
        </fieldset>
      </Form>
    </Formik>
  );
}
