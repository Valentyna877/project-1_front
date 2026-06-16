'use client';

import '@/app/globals.css';
import css from './page.module.css';
import RegistrationForm from '@/components/auth/RegistrationForm/RegistrationForm';
import Image from 'next/image';
import { IMG_VARS } from '@/app/imgVars';
import Link from 'next/link';
import AuthHeader from '@/components/auth/AuthHeader/AuthHeader';
import Button from '@/components/common/Button/Button';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/lib/store/authStore';
import { useGoogleLogin } from '@react-oauth/google';
import { ToastProvider } from '@/components/common/Toast/ToastProvider';
import { useMutation } from '@tanstack/react-query';
import { loginGoogle } from '@/lib/api/clientApi';

const Register = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

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
                <h1 className={css.title}>Реєстрація</h1>
                <RegistrationForm
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
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
                  <p>Зареєструватись через Google</p>
                </Button>
                <Link href={'/auth/login'} className={css.redirection}>
                  Вже маєте аккаунт? <span>Увійти</span>
                </Link>
              </div>
            </div>
          </main>
        </div>
        <Image
          className={css.img}
          src={IMG_VARS.STORK1X}
          alt="stork"
          width={720}
          height={900}
        ></Image>
      </div>
    </>
  );
};

export default Register;
