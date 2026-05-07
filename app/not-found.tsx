'use client';

import type { Metadata } from 'next';
import Link from 'next/link';
import ButtonLink from '@/components/common/Button/ButtonLink';
import css from './not-found.module.css';
import './globals.css';
import Loader from '@/components/common/Loader/Loader';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/common/Button/Button';
import { useTheme } from '@/hooks/useTheme';

// export const metadata: Metadata = {
//   title: '404 | Сторінку не знайдено — Лелека',
//   description:
//     'Сторінка не існує або була переміщена. Поверніться на головну сторінку додатку Лелека.',
// };

function NotFound() {
  const [second, setSecond] = useState<number>(60);
  const { theme, themeClass } = useTheme();
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push('/'), 60000);
    return () => clearTimeout(timer);
  }, [router]);

  useEffect(() => {
    if (second <= 0) return;

    const interval = setInterval(() => {
      setSecond((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [second]);

  const handleMain = () => {
    router.replace('/');
  };
  return (
    <section className="container">
      <div className={css.left}>
        <div className={css.logoRow}>
          <Link href="/" className={css.logoLink}>
            <svg className={css.logo}>
              <use href="/sprite.svg#icon-logo"></use>
            </svg>
          </Link>
        </div>
        <Loader variant="global-inline" theme={theme} />
        <div className={css.formWrap}>
          <p
            className={`${css.error404} ${css[themeClass]}`}
            aria-hidden="true"
          >
            404
          </p>

          <h1 className={css.title}>Пу пу пу!</h1>
          <p className={css.subtitle}>А нема такої.</p>

          <p className={css.text}>
            Вас буде перенаправлено на головну через {second} секунд…
          </p>

          {/* <ButtonLink href="/" size="md">
            На головну
          </ButtonLink> */}
          <Button variant="normal" size="md" onClick={handleMain}>
            На головну
          </Button>
        </div>
      </div>
    </section>
  );
}

export default NotFound;
