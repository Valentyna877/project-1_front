'use client';

import { Formik, Form, Field, FieldProps } from 'formik';
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
      {({ submitCount }) => (
        <Form className={css.form}>
          <div className={css.fieldWrapper}>
            <label>Заголовок</label>
            <Field name="title">
              {({ field, meta }: FieldProps<string>) => {
                const hasError = meta.touched && !!meta.error;
                return (
                  <>
                    <input
                      {...field}
                      type="text"
                      placeholder="Введіть заголовок запису"
                      className={`${css.input} ${hasError ? css.inputError : ''}`}
                    />
                    <div className={css.metaRow}>
                      {hasError && (
                        <span className={css.error}>{meta.error}</span>
                      )}
                    </div>
                  </>
                );
              }}
            </Field>
          </div>

          <div className={css.fieldWrapper}>
            <label className={css.label}>Категорії</label>
            <MultiSelect
              hasError={submitCount > 0 && draft.emotions.length === 0}
            />
            <div className={css.metaRow}>
              {submitCount > 0 && draft.emotions.length === 0 && (
                <span className={css.error}>
                  Оберіть хоча б одну категорію
                </span>
              )}
            </div>
          </div>

          <div className={css.fieldWrapper}>
            <label>Запис</label>
            <Field name="text">
              {({ field, form, meta }: FieldProps<string>) => {
                const hasError = meta.touched && !!meta.error;
                return (
                  <>
                    <textarea
                      {...field}
                      placeholder="Запишіть, як ви себе відчуваєте"
                      className={`${css.textarea} ${hasError ? css.inputError : ''}`}
                      maxLength={TEXT_MAX}
                      onChange={(e) => {
                        const v = e.target.value.slice(0, TEXT_MAX);
                        form.setFieldValue(field.name, v);
                      }}
                    />
                    <div className={css.metaRow}>
                      {hasError && (
                        <span className={css.error}>{meta.error}</span>
                      )}
                      <span className={css.counter}>
                        {(field.value ?? '').length}/{TEXT_MAX}
                      </span>
                    </div>
                  </>
                );
              }}
            </Field>
          </div>

          <div className={css.actions}>
            <Button
              variant="normal"
              size="lg"
              type="submit"
              disabled={isSaving}
              className={css.submitBtn}
            >
              Зберегти
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
