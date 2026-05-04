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
import { GenderValue } from '@/components/common/GenderSelect/gender-select.types';
import FormikGenderSelect from '@/components/common/GenderSelect/FormikGenderSelect';
import { genderSelectStyles } from '@/components/common/GenderSelect/gender-select.styles';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';
import { CalendarIcon } from 'lucide-react';

interface ProfileEditFormProps {
  user: User;
}

interface ProfileEditFormValues {
  email: string;
  name: string;
  gender?: GenderValue | null;
  dueDate?: string;
}

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  const fieldId = useId();
  const setUser = useAuthStore((state) => state.setUser);

  const initialValues: ProfileEditFormValues = {
    name: user.name,
    email: user.email,
    gender: user.gender,
    dueDate: user.date ?? '',
  };
  // const today = useMemo(() => new Date(), []);
  // const maxDate = useMemo(
  //   () => new Date(today.getTime() + FORTY_WEEKS),
  //   [today]
  // );

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
    } catch {
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
      {({ resetForm }) => (
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
              className={styles.input}
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
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="span"
              className={styles.error}
            />
          </div>
          <div className={styles.genderField}>
            <label className={styles.label}>Стать дитини</label>
            <FormikGenderSelect styles={genderSelectStyles} />
          </div>

          {/* <ErrorMessage name="gender" component="p" /> */}
          <div className={styles.dateField}>
            <Field
              name="dueDate"
              component={CalendarDatePicker}
              placeholderText={user.date}
              className={styles.datePicker}
              minDate={today}
              maxDate={maxDate}
              dateFormat="dd-MM-yyyy"
              label="Планова дата пологів"
              labelClassName={styles.label}
              showIcon={CalendarIcon}
            />
          </div>

          <ErrorMessage name="dueDate" component="p" />
          <div className={styles.buttons}>
            <Button
              className={styles.btnClose}
              type="reset"
              size="sm"
              variant="cancel"
              onClick={() => resetForm()}
            >
              Відмінити зміни
            </Button>
            <Button
              className={styles.btnSubmit}
              type="submit"
              variant="normal"
              size="sm"
            >
              Зберегти зміни
            </Button>
          </div>
        </Form>
      )}
    </Formik>
  );
}
