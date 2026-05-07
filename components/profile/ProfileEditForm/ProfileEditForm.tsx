'use client';

import { User } from '@/types/user';
import styles from './ProfileEditForm.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { useId, useState } from 'react';
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from 'formik';
import Button from '@/components/common/Button/Button';
import CalendarDatePicker from '@/components/common/CalendarDatePicker/CalendarDatePicker';
import { FORTY_WEEKS, profileSchema } from './ProfileValidationSchema';
import { nextServer } from '@/lib/api/api';
import { getUser } from '@/lib/api/clientApi';
import { useRouter } from 'next/navigation';
import { GenderValue } from '@/components/common/GenderSelect/gender-select.types';
import FormikGenderSelect from '@/components/common/GenderSelect/FormikGenderSelect';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';
import { CalendarIcon } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

interface ProfileEditFormProps {
  user: User;
}

interface ProfileEditFormValues {
  email: string;
  name: string;
  gender?: GenderValue | null;
  dueDate?: string;
}

const normalizeDate = (date?: string | null): string => {
  if (!date) return '';
  if (date.includes('T')) {
    return date.split('T')[0];
  }

  if (/^\d{4}-\d{2}-\d{2}$/.test(date)) return date;
  const match = date.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (match) return `${match[3]}-${match[2]}-${match[1]}`;
  return '';
};

const formatDisplayDate = (date?: string | null): string => {
  if (!date) return '';

  if (date.includes('T')) {
    const [yyyy, mm, dd] = date.split('T')[0].split('-');
    return `${dd}.${mm}.${yyyy}`;
  }
  const match = date.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (match) return `${match[3]}-${match[2]}-${match[1]}`;
  if (/^\d{2}-\d{2}-\d{4}$/.test(date)) return date;
  return date;
};

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  const fieldId = useId();
  const setUser = useAuthStore((state) => state.setUser);
  const { themeClass } = useTheme();
  const router = useRouter();

  const initialValues: ProfileEditFormValues = {
    name: user.name,
    email: user.email,
    gender: user.gender,
    dueDate: normalizeDate(user.date),
  };

  const [today] = useState(() => new Date());
  const [maxDate] = useState(() => new Date(Date.now() + FORTY_WEEKS));

  const handleSubmit = async (
    values: ProfileEditFormValues,
    actions: FormikHelpers<ProfileEditFormValues>
  ) => {
    try {
      const payload: Record<string, unknown> = {};

      if (values.gender !== undefined) {
        payload.gender = values.gender;
      }
      if (values.dueDate) {
        payload.date = values.dueDate;
      }

      if (Object.keys(payload).length > 0) {
        await nextServer.patch('/users/me', payload);
      }

      const updateUser = await getUser();
      console.log('updateUser:', updateUser);
      setUser(updateUser);
      actions.resetForm();
      ToastProvider.success('Профіль оновлено');
    } catch (error) {
      if (error instanceof Error) {
        const status = (error as { status?: number }).status;

        if (status === 401) {
          ToastProvider.error('Час сесії вийшов. Будь ласка, увійдіть знову');
          router.push('/auth/login');
          return;
        }
      }
      ToastProvider.error('Помилка при оновленні профілю. Спробуйте ще раз.');
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={profileSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ resetForm, dirty, isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor={`${fieldId}-name`} className={styles.label}>
              Ім&apos;я
            </label>
            <Field
              type="text"
              name="name"
              id={`${fieldId}-name`}
              placeholder={user.name}
              className={`${styles.input} ${styles[themeClass]}`}
              readOnly
            />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor={`${fieldId}-email`} className={styles.label}>
              Пошта
            </label>
            <Field
              type="email"
              name="email"
              id={`${fieldId}-email`}
              placeholder={user.email}
              className={`${styles.input} ${styles[themeClass]}`}
            />
            <ErrorMessage
              name="email"
              component="span"
              className={styles.error}
            />
          </div>

          <div className={styles.genderField}>
            <label className={styles.label}>Стать дитини</label>
            <FormikGenderSelect
              // styles={genderSelectStyles}
              themeClass={themeClass}
            />
          </div>

          <div className={styles.dateField}>
            <Field
              name="dueDate"
              component={CalendarDatePicker}
              placeholderText={formatDisplayDate(user.date)}
              className={styles.datePicker}
              minDate={today}
              maxDate={maxDate}
              dateFormat="dd-MM-yyyy"
              label="Планова дата пологів"
              labelClassName={styles.label}
              showIcon={CalendarIcon}
            />
          </div>

          <div className={styles.buttons}>
            <Button
              className={styles.btnClose}
              type="reset"
              size="sm"
              variant="cancel"
              onClick={() => resetForm()}
              disabled={!dirty}
            >
              Відмінити зміни
            </Button>
            <Button
              className={styles.btnSubmit}
              type="submit"
              variant="normal"
              size="sm"
              disabled={!dirty}
              isLoading={isSubmitting}
              loadingText="Зберігаються...."
            >
              Зберегти зміни
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
