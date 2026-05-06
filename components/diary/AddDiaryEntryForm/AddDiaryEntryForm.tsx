'use client';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useQueryClient } from '@tanstack/react-query';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';
import MultiSelect from './MultiSelect';
import css from './AddDiaryEntryForm.module.css';
import { useDiaryStore } from '@/lib/store/diaryStore';
import Button from '@/components/common/Button/Button';
import { DiaryEntry } from '@/types/diary';

interface FormValues {
  title: string;
  text: string;
}

interface Props {
  onSuccess: (entry?: DiaryEntry) => void;
}

const TEXT_MAX = 1000;

const validationSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, 'Занадто короткий заголовок')
    .required("Заголовок обов'язковий"),
  text: Yup.string()
    .min(10, 'Запис має бути інформативнішим')
    .max(TEXT_MAX)
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
          <label>Заголовок</label>
          <Field
            type="text"
            name="title"
            placeholder="Введіть заголовок запису"
            className={css.input}
          />
          <ErrorMessage name="title" component="span" className={css.error} />
        </div>

        <div className={css.fieldWrapper}>
          <label className={css.label}>Категорії</label>
          <MultiSelect />
        </div>

        <div className={css.fieldWrapper}>
          <label>Запис</label>
          <Field name="text">
            {({
              field,
              form,
            }: {
              field: { value: string; name: string; onBlur: (e: React.FocusEvent) => void };
              form: { setFieldValue: (n: string, v: string) => void };
            }) => (
              <>
                <textarea
                  {...field}
                  placeholder="Запишіть, як ви себе відчуваєте"
                  className={css.textarea}
                  maxLength={TEXT_MAX}
                  onChange={(e) => {
                    const v = e.target.value.slice(0, TEXT_MAX);
                    form.setFieldValue(field.name, v);
                  }}
                />
                <span className={css.counter}>
                  {(field.value ?? '').length}/{TEXT_MAX}
                </span>
              </>
            )}
          </Field>
        </div>

        <div className={css.actions}>
          <Button
            variant="normal"
            size="lg"
            type="submit"
            disabled={isSaving}
            loadingText="Збереження..."
            className={css.submitBtn}
          >
            Зберегти
          </Button>
        </div>
      </Form>
    </Formik>
  );
}
