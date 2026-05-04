'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';
import MultiSelect from './MultiSelect';
import css from './AddDiaryEntryForm.module.css';
import { useDiaryStore } from '@/lib/store/diaryStore';
import { DiaryEntry } from '@/types/diary';

interface FormValues {
  title: string;
  text: string;
}

interface Props {
  onSuccess: (entry?: DiaryEntry) => void;
}

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Занадто короткий заголовок')
    .required("Заголовок обов'язковий"),
  text: Yup.string()
    .min(10, 'Запис має бути інформативнішим')
    .required('Поле запису не може бути порожнім'),
});

export default function AddDiaryEntryForm({ onSuccess }: Props) {
  const queryClient = useQueryClient();
  const { submitDraft, setDraft, isSaving, draft, editingId } = useDiaryStore();

  const defaultValues: FormValues = {
    title: draft.title,
    text: draft.description,
  };

  const handleSubmit = async (values: FormValues) => {
    setDraft({ title: values.title, description: values.text });

    await submitDraft((entry) => {
      ToastProvider.success(editingId ? 'Запис оновлено' : 'Запис збережено');
      queryClient.invalidateQueries({ queryKey: ['diary'] });
      onSuccess(entry);
    });
  };

  return (
    <Formik
      key={editingId ?? 'new'}
      initialValues={defaultValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
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
            {draft.emotions.length === 0 && (
              <span className={css.error}>Оберіть хоча б одну категорію</span>
            )}
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

          <button type="submit" className={css.submitBtn} disabled={isSaving}>
            {isSaving ? 'Збереження...' : 'Зберегти'}
          </button>
        </Form>
    </Formik>
  );
}
