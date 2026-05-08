'use client';

import {
  changeCreds,
  UserChangeCreds,
  UserLogCreds,
} from '@/lib/api/clientApi';
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
import clsx from 'clsx';
import { User } from '@/types/user';
import { AxiosError } from 'axios';

const initialValues: UserLogCreds = {
  email: '',
  password: '',
};

interface ResetDataFormProps {
  user: User;
  token: string;
}

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
  .test('Змініть хочаб одне поле', function (value) {
    if (!value.email && !value.password) {
      return this.createError({
        path: 'general',
        message: 'Необхідно заповнити хоча б одне поле',
      });
    }
    return true;
  });

const ResetDataForm = ({ user, token }: ResetDataFormProps) => {
  const fieldId = useId();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );

  const { mutate } = useMutation({
    mutationFn: changeCreds,
    onSuccess: () => {
      clearIsAuthenticated();
      ToastProvider.success('Дані успішно змінено! Увійдіть заново');
      router.push('/auth/login');
    },
    onError: (error) => {
      const err = error as AxiosError;
      if (err.status === 400) {
        ToastProvider.error('Таку пошту вже зайнято!');
        setIsLoading(false);
      } else {
        ToastProvider.error('Упс, щось пішло не так. Спробуйте ще раз!');
        // router.push('/');
      }
    },
  });

  const handleSubmit = (values: UserLogCreds): void => {
    setIsLoading(true);
    const payload: UserChangeCreds = { token };

    if (values.email.trim()) {
      payload.email = values.email.trim();
    }
    if (values.password.trim()) {
      payload.password = values.password.trim();
    }
    mutate(payload);
  };

  return (
    <>
      {isLoading && createPortal(<Loader />, document.body)}
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={formSchema}
      >
        {({ errors }) => {
          const generalError = (errors as Record<string, string>).general;
          return (
            <Form className={css.form}>
              {generalError && (
                <span
                  className={css['second-span']}
                  style={{ textAlign: 'center', marginBottom: '10px' }}
                >
                  {generalError}
                </span>
              )}
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
                          placeholder={user.email}
                          autoComplete={'email'}
                          className={`${css.input} ${hasError ? css['input-error'] : ''}`}
                        />
                        {hasError && (
                          <span className={css.span}>{meta.error}</span>
                        )}
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
                        {hasError && (
                          <span className={css.span}>{meta.error}</span>
                        )}
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
          );
        }}
      </Formik>
    </>
  );
};

export default ResetDataForm;
