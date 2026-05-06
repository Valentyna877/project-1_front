import clsx from 'clsx';
import css from './AuthHeader.module.css';
import Link from 'next/link';

export default function AuthHeader() {
  return (
    <>
      <header>
        <div className={clsx('container', css['header-container'])}>
          <Link href="/">
            <svg className={css['header-logo']}>
              <use href="/sprite.svg#icon-logo"></use>
            </svg>
          </Link>
        </div>
      </header>
    </>
  );
}
