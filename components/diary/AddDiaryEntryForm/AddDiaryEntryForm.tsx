'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';
import MultiSelect from './MultiSelect';
import css from './AddDiaryEntryForm.module.css';
import { Emotions } from '@/lib/api/clientApi';

type Option = {
  value: string;
  label: string;
};

interface FormValues {
  title: string;
  categories: string[];
  text: string;
}

interface Props {
  onSuccess: () => void;
  initialValues?: FormValues;
  options?: Emotions[];
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Занадто короткий заголовок')
    .required("Заголовок обов'язковий"),

  categories: Yup.array()
    .min(1, 'Оберіть хоча б одну категорію')
    .required("Категорії обов'язкові"),

  text: Yup.string()
    .min(10, 'Запис має бути інформативнішим')
    .required('Поле запису не може бути порожнім'),
});

export default function AddDiaryEntryForm({
  onSuccess,
  initialValues,
  options,
}: Props) {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newData: FormValues) => {
      console.log('Відправка:', newData);

      // запит на бек
      // await fetch('/api/diary', {...})

      return new Promise((resolve) => setTimeout(resolve, 1000));
    },

    onSuccess: () => {
      ToastProvider.success('Запис збережено');
      queryClient.invalidateQueries({ queryKey: ['diary'] });
      onSuccess();
    },

    onError: () => {
      ToastProvider.error('Помилка при збереженні');
    },
  });

  const defaultValues: FormValues = initialValues || {
    title: '',
    categories: [],
    text: '',
  };

  return (
    <Formik
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={(values) => mutation.mutate(values)}
    >
      {({ setFieldValue, values }) => (
        <Form className={css.form}>
          <div className={css.fieldWrapper}>
            <label className={css.label}>Заголовок</label>

            <Field
              name="title"
              placeholder="Введіть заголовок запису"
              className={css.input}
            />

            <ErrorMessage name="title" component="span" className={css.error} />
          </div>

          <div className={css.fieldWrapper}>
            <label className={css.label}>Категорії</label>

            <MultiSelect />

            <ErrorMessage
              name="categories"
              component="span"
              className={css.error}
            />
          </div>

          <div className={css.fieldWrapper}>
            <label className={css.label}>Запис</label>

            <Field
              as="textarea"
              name="text"
              placeholder="Запишіть, як ви себе відчуваєте"
              className={css.textarea}
            />

            <ErrorMessage name="text" component="span" className={css.error} />
          </div>

          <button
            type="submit"
            className={css.submitBtn}
            disabled={mutation.isPending}
          >
            {mutation.isPending ? 'Збереження...' : 'Зберегти'}
          </button>
        </Form>
      )}
    </Formik>
  );
}
