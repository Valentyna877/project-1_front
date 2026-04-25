'use client';

import css from './AddTaskForm.module.css';
import { Formik, Form, Field, type FormikHelpers, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useId } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createTask } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { useAddTaskDraftStore } from '@/lib/store/taskStore';

const initialValues: AddTaskFormValues = {
  name: '',
  date: new Date().toISOString().split('T')[0],
};

const AddTaskFormSchema = Yup.object().shape({
  name: Yup.string()
    .min(1, 'Name must be at least 3 characters')
    .max(96, 'Name is too long')
    .required('Name is required'),
  date: Yup.string(),
  isDone: Yup.boolean().default(false),
});

return (
  <Formik
    initialValues={initialValues}
    onSubmit={handleSubmit}
    validationSchema={AddTaskFormSchema}
  >
    <Form className={css.form}>
      <fieldset>
        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-title`}>Title</label>
          <Field
            id={`${fieldId}-title`}
            type="text"
            name="title"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-content`}>Content</label>
          <Field
            id={`${fieldId}-content`}
            name="content"
            rows={8}
            className={css.textarea}
            as="textarea"
          />
          <ErrorMessage name="content" component="span" className={css.error} />
        </div>

        <div className={css.formGroup}>
          <label htmlFor={`${fieldId}-tag`}>Tag</label>
          <Field
            id={`${fieldId}-tag`}
            name="tag"
            as="select"
            className={css.select}
          >
            <option value="Todo">Todo</option>
            <option value="Work">Work</option>
            <option value="Personal">Personal</option>
            <option value="Meeting">Meeting</option>
            <option value="Shopping">Shopping</option>
          </Field>
          <ErrorMessage name="tag" component="span" className={css.error} />
        </div>

        <div className={css.actions}>
          <button type="button" className={css.cancelButton} onClick={onClose}>
            Cancel
          </button>
          <button
            type="submit"
            className={css.submitButton}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Creating note...' : 'Create note'}
          </button>
        </div>
      </fieldset>
    </Form>
  </Formik>
);
