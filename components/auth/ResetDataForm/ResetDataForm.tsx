import { loginUser, UserLogCreds } from '@/lib/api/clientApi';
import css from './ResetData.module.css';
import { Formik, Form, Field, FieldProps } from 'formik';
import { useId, useState } from 'react';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import Button from '@/components/common/Button/Button';
import { useRouter } from 'next/navigation';
import Loader from '@/components/common/Loader/Loader';
import { createPortal } from 'react-dom';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';
import { useTheme } from '@/hooks/useTheme';
import clsx from 'clsx';

const initialValues: UserLogCreds = {
  email: '',
  password: '',
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const formSchema = Yup.object()
  .shape({
    email: Yup.string()
      .matches(emailRegex, 'Некоректний формат електронної пошти')
      .max(64, 'Пошта не може перевищувати 64 символи'),
    password: Yup.string()
      .min(8, 'Пароль має містити мінімум 8 символів')
      .max(128, 'Пароль не може перевищувати 128 символів'),
  })
  .test('Змініть хочаб одне поле', (value) => {
    if (!value) return false;
    return Object.values(value).some(
      (v) => v !== undefined && v !== null && v !== ''
    );
  });

const ResetDataForm = () => {
  const fieldId = useId();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const { theme } = useTheme();

  const { mutate } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data);
      router.push('/profile');
      ToastProvider.success('Дані успішно змінено!');
    },
    onError: () => {
      setIsLoading(false);
      ToastProvider.error('Щось пішло не так. Вже лагодимо!');
    },
  });

  const handleSubmit = (values: UserLogCreds): void => {
    setIsLoading(true);
    mutate(values);
  };

  return (
    <>
      {isLoading && createPortal(<Loader theme={theme} />, document.body)}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={formSchema}
      >
        <Form className={css.form}>
          <div className={css['field-set']}>
            <label htmlFor={`${fieldId}-email`}></label>
            <Field name="email">
              {({ field, meta }: FieldProps) => {
                const hasError = meta.touched && meta.error;
                return (
                  <>
                    <input
                      {...field}
                      type="email"
                      id={`${fieldId}-email`}
                      placeholder={user?.email}
                      autoComplete={'email'}
                      className={`${css.input} ${hasError ? css['input-error'] : ''}`}
                    />
                    {hasError && <span className={css.span}>{meta.error}</span>}
                  </>
                );
              }}
            </Field>
          </div>
          <div className={css['field-set']}>
            <label htmlFor={`${fieldId}-password`}></label>
            <Field name="password">
              {({ field, meta }: FieldProps) => {
                const hasError = meta.touched && meta.error;
                return (
                  <>
                    <input
                      {...field}
                      type="password"
                      id={`${fieldId}-password`}
                      placeholder={'********'}
                      autoComplete={'new-password'}
                      className={`${css.input} ${hasError ? css['input-error'] : ''}`}
                    />
                    {hasError && <span className={css.span}>{meta.error}</span>}
                  </>
                );
              }}
            </Field>
          </div>
          <Button
            className={clsx(css.button)}
            type="submit"
            disabled={isLoading}
          >
            Змінити
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default ResetDataForm;
