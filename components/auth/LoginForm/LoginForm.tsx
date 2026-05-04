import { loginUser, UserLogCreds } from '@/lib/api/clientApi';
import css from './LoginForm.module.css';
import { Formik, Form, Field, FieldProps } from 'formik';
import { useId, useState } from 'react';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import Button from '@/components/common/Button/Button';
import { useRouter } from 'next/navigation';
import Loader from '@/components/common/Loader/Loader';
import { createPortal } from 'react-dom';
import { AxiosError } from 'axios';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';

const initialValues: UserLogCreds = {
  email: '',
  password: '',
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const formSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, 'Некоректний формат електронної пошти')
    .max(64, 'Пошта не може перевищувати 64 символи')
    .required("Обов'язково поле"),
  password: Yup.string()
    .min(8, 'Пароль має містити мінімум 8 символів')
    .max(128, 'Пароль не може перевищувати 128 символів')
    .required("Обов'язково поле"),
});

const LoginForm = () => {
  const fieldId = useId();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setIsRedirecting(true);
      setUser(data);
      router.push('/');
    },
    onError: (error) => {
      const err = error as AxiosError;
      ToastProvider.error(
        err.status === 401
          ? 'Неправильна пошта або пароль. Перевірте дані та спробуйте ще раз.'
          : 'Щось пішло не так. Вже лагодимо!'
      );
    },
  });

  const isLoading = isPending || isRedirecting;

  const handleSubmit = (values: UserLogCreds): void => {
    mutate(values);
  };

  return (
    <>
      {isLoading && createPortal(<Loader />, document.body)}
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
                      placeholder={'Пошта'}
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
                      placeholder={'Пароль'}
                      autoComplete={'current-password'}
                      className={`${css.input} ${hasError ? css['input-error'] : ''}`}
                    />
                    {hasError && <span className={css.span}>{meta.error}</span>}
                  </>
                );
              }}
            </Field>
          </div>
          <Button type="submit" disabled={isLoading}>
            Увійти
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default LoginForm;
