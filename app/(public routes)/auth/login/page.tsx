'use client';

import css from './page.module.css';
import Image from 'next/image';
import { IMG_VARS } from '@/app/imgVars';
import LoginForm from '@/components/auth/LoginForm/LoginForm';
import clsx from 'clsx';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';
import Button from '@/components/common/Button/Button';
import AuthHeader from '@/components/auth/AuthHeader/AuthHeader';

const Login = () => {
  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.has('error')) {
      ToastProvider.error(
        'Упс, щось пішло не так! Будь ласка, увійдіть ще раз.'
      );
      window.history.replaceState(null, '', '/auth/login');
    }
  }, [searchParams]);

  return (
    <>
      <AuthHeader />
      <main className={css.section}>
        <div className={clsx('container', css.content)}>
          <h1 className={css.title}>Вхід</h1>
          <LoginForm />
          <Button
            className={css['google-button']}
            type="button"
            variant={'cancel'}
          >
            <svg className={css['header-logo']}>
              <use href="/sprite.svg#icon-Google"></use>
            </svg>
            <p>Увійти через Google</p>
          </Button>
          <Link href={'/auth/register'} className={css.redirection}>
            Немає аккаунту? <span>Зареєструватися</span>
          </Link>
        </div>
        <Image
          className={css.img}
          src={IMG_VARS.EGGS1X}
          alt="eggs"
          width={720}
          height={900}
        ></Image>
      </main>
    </>
  );
};

export default Login;
