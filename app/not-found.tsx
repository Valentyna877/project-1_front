import type { Metadata } from 'next';
import Link from 'next/link';
import ButtonLink from '@/components/common/Button/ButtonLink';
import css from './not-found.module.css';
import './globals.css';

export const metadata: Metadata = {
  title: '404 | Сторінку не знайдено — Лелека',
  description:
    'Сторінка не існує або була переміщена. Поверніться на головну сторінку додатку Лелека.',
};

function NotFound() {

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

        <div className={css.formWrap}>
          <p className={css.error404} aria-hidden="true">
            404
          </p>

          <h1 className={css.title}>Пу пу пу!</h1>
          <p className={css.subtitle}>А нема такої.</p>

          <p className={css.text}>Спробуйте повернутися на головну сторінку.</p>

          <ButtonLink href="/" size="md">
            На головну
          </ButtonLink>
        </div>
      </div>
{/* 
      <div className={css.right} aria-hidden="true">
        <Loader variant="global" />
      </div> */}
    </section>
  );
}

export default NotFound;
