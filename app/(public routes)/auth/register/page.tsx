'use client';

import '@/app/globals.css';
import css from './page.module.css';
import RegistrationForm from '@/components/auth/RegistrationForm/RegistrationForm';
import Image from 'next/image';
import { IMG_VARS } from '@/app/imgVars';
import clsx from 'clsx';
import Link from 'next/link';

const Register = () => {
  return (
    <main className={clsx('container', css.section)}>
      <div className={css.content}>
        <div className={css.header}>
          <Link href="/">
            <svg className={css['header-logo']}>
              <use href="/sprite.svg#icon-logo"></use>
            </svg>
          </Link>
        </div>
        <h1 className={css.title}>Реєстрація</h1>
        <RegistrationForm />
        <Link href={'/auth/login'} className={css.redirection}>
          Вже маєте аккаунт? <span>Увійти</span>
        </Link>
      </div>
      <Image
        className={css.img}
        src={IMG_VARS.STORK1X}
        alt="stork"
        width={720}
        height={900}
      ></Image>
    </main>
  );
};

export default Register;
