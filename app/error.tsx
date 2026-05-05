'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Button from '@/components/common/Button/Button';
import css from './error.module.css';
import './globals.css';

type Props = {
  error: Error;
  reset: () => void;
};

function GlobalError({ error, reset }: Props) {
  const router = useRouter();

  return (
    <section className="container">
      <div className={css.left}>
        <div className={css.logoRow}>
          <Link href="/">
            <svg className={css.logo}>
                <use href="/sprite.svg#icon-logo"></use>
            </svg>
          </Link>
        </div>

        <div className={css.formWrap}>
          <div className={css.inner}>
            <div className={css.content}>
              <h2 className={css.title}>Щось воно не робе!</h2>
              <p className={css.desc}>
                Ми вже фіксимо. Спробуйте повторити дію.
              </p>

              <p className={css.devMsg} title={error.message}>
                {error.message}
              </p>

              <ul className={css.actions}>
                <li>
                  <Button onClick={reset} size="md">
                    Спробувати знову
                  </Button>
                </li>

                <li>
                  <Button
                    variant="cancel"
                    size="md"
                    onClick={() => router.back()}
                  >
                    Повернутися назад
                  </Button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* <div className={css.right} aria-hidden="true">
            <Loader variant="global" />
      </div> */}
    </section>
  );
}

export default GlobalError;
