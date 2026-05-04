import { registerUser, UserRegCreds } from '@/lib/api/clientApi';
import css from './RegistrationForm.module.css';
import { Formik, Form, Field, FieldProps } from 'formik';
import { useId, useState } from 'react';
import * as Yup from 'yup';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/lib/store/authStore';
import Button from '@/components/common/Button/Button';
import { useRouter } from 'next/navigation';
import { createPortal } from 'react-dom';
import Loader from '@/components/common/Loader/Loader';
import { AxiosError } from 'axios';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';

const initialValues: UserRegCreds = {
  name: '',
  email: '',
  password: '',
};

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const formSchema = Yup.object().shape({
  name: Yup.string()
    .max(32, 'Імʼя не може перевищувати 32 символи')
    .required("Обов'язково поле"),
  email: Yup.string()
    .matches(emailRegex, 'Некоректний формат електронної пошти')
    .max(64, 'Пошта не може перевищувати 64 символи')
    .required("Обов'язково поле"),
  password: Yup.string()
    .min(8, 'Пароль має містити мінімум 8 символів')
    .max(128, 'Пароль не може перевищувати 128 символів')
    .required("Обов'язково поле"),
});

const RegistrationForm = () => {
  const fieldId = useId();
  const router = useRouter();
  const [isRedirecting, setIsRedirecting] = useState(false);
  const setUser = useAuthStore((state) => state.setUser);

  const { mutate, isPending } = useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      setIsRedirecting(true);
      setUser(data);
      router.push('/profile/edit');
    },
    onError: (error) => {
      const err = error as AxiosError;
      ToastProvider.error(
        err.status === 400
          ? 'Користувач з такою поштою вже існує.'
          : 'Щось пішло не так. Вже лагодимо!'
      );
    },
  });

  const isLoading = isPending || isRedirecting;

  const handleSubmit = (values: UserRegCreds): void => {
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
            <label htmlFor={`${fieldId}-title`}>Імʼя*</label>
            <Field name="name">
              {({ field, meta }: FieldProps) => {
                const hasError = meta.touched && meta.error;
                return (
                  <>
                    <input
                      {...field}
                      type="text"
                      id={`${fieldId}-title`}
                      placeholder={'Ваше імʼя'}
                      autoComplete={'username'}
                      className={`${css.input} ${hasError ? css['input-error'] : ''}`}
                    />
                    {hasError && <span className={css.span}>{meta.error}</span>}
                  </>
                );
              }}
            </Field>
          </div>
          <div className={css['field-set']}>
            <label htmlFor={`${fieldId}-email`}>Пошта*</label>
            <Field name="email">
              {({ field, meta }: FieldProps) => {
                const hasError = meta.touched && meta.error;
                return (
                  <>
                    <input
                      {...field}
                      type="email"
                      id={`${fieldId}-email`}
                      placeholder={'hello@leleka.com'}
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
            <label htmlFor={`${fieldId}-password`}>Пароль*</label>
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
          <Button type="submit" disabled={isLoading}>
            Зареєструватись
          </Button>
        </Form>
      </Formik>
    </>
  );
};

export default RegistrationForm;
