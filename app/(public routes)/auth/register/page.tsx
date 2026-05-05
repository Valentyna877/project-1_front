'use client';

import '@/app/globals.css';
import css from './page.module.css';
import RegistrationForm from '@/components/auth/RegistrationForm/RegistrationForm';
import Image from 'next/image';
import { IMG_VARS } from '@/app/imgVars';
import clsx from 'clsx';
import Link from 'next/link';
import AuthHeader from '@/components/auth/AuthHeader/AuthHeader';
import Button from '@/components/common/Button/Button';

const Register = () => {
  return (
    <>
      <div className={css.content}>
        <div className={css['left-wrapper']}>
          <AuthHeader />
          <main className={css.section}>
            <div className="container">
              <div className={css['form-content']}>
                <h1 className={css.title}>Реєстрація</h1>
                <RegistrationForm />
                <Button
                  className={css['google-button']}
                  type="button"
                  variant={'cancel'}
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
