export const dynamic = "force-dynamic";

'use client';

import css from './page.module.css';
import Image from 'next/image';
import { IMG_VARS } from '@/app/imgVars';
import LoginForm from '@/components/auth/LoginForm/LoginForm';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';
import Button from '@/components/common/Button/Button';
import AuthHeader from '@/components/auth/AuthHeader/AuthHeader';
import { useGoogleLogin } from '@react-oauth/google';
import { useMutation } from '@tanstack/react-query';
import { loginGoogle } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

const Login = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const searchParams = useSearchParams();
  useEffect(() => {
    if (searchParams.has('error')) {
      ToastProvider.error(
        'Упс, щось пішло не так! Будь ласка, увійдіть ще раз.'
      );
      window.history.replaceState(null, '', '/auth/login');
    }
  }, [searchParams]);

  const googleLogin = useGoogleLogin({
    onSuccess: (codeResponse) => {
      mutate(codeResponse);
    },
    onError: () => {
      setIsLoading(false);
      ToastProvider.error('Щось пішло не так.');
    },
    onNonOAuthError: () => {
      setIsLoading(false);
      ToastProvider.error('Щось пішло не так.');
    },
  });

  const { mutate } = useMutation({
    mutationFn: loginGoogle,
    onSuccess: (data) => {
      setUser(data);
      router.push(data.isNewUser ? '/profile/edit' : '/');
    },
    onError: () => {
      setIsLoading(false);
      ToastProvider.error('Щось пішло не так. Вже лагодимо!');
    },
  });

  return (
    <>
      <div className={css.content}>
        <div className={css['left-wrapper']}>
          <AuthHeader />
          <main className={css.section}>
            <div className="container">
              <div className={css['form-content']}>
                <h1 className={css.title}>Вхід</h1>
                <LoginForm isLoading={isLoading} setIsLoading={setIsLoading} />
                <Button
                  className={css['google-button']}
                  type="button"
                  variant={'cancel'}
                  onClick={() => {
                    setIsLoading(true);
                    googleLogin();
                  }}
                  disabled={isLoading}
                >
                  <svg>
                    <use href="/sprite.svg#icon-Google"></use>
                  </svg>
                  <p>Увійти через Google</p>
                </Button>
                <Link href={'/auth/register'} className={css.redirection}>
                  Немає аккаунту? <span>Зареєструватися</span>
                </Link>
              </div>
            </div>
          </main>
        </div>
        <Image
          className={css.img}
          src={IMG_VARS.EGGS1X}
          alt="eggs"
          width={720}
          height={900}
        ></Image>
        </div>
    </>
  );
};

export default Login;
