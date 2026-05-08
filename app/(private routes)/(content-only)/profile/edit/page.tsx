import '@/styles/container.css';
import css from './page.module.css';
import { IMG_VARS } from '@/app/imgVars';
import OnboardingClient from '@/components/profile/OnboardingForm/OnboardingClient';
import Link from 'next/link';
// import { headers } from 'next/headers';
// import { redirect } from 'next/navigation';

export default function OnboardingPage() {
  // const headersList = await headers();
  // const referer = headersList.get('referer');
  // if (!referer || !referer.includes('localhost:3000')) {
  //     redirect('/');
  // }
  return (
    <div className={`container ${css.padding}`}>
      <div className={css.page}>
        <div className={css.formSide}>
          <Link href="/" className={css.logoLink}>
            <svg className={css.logo}>
              <use href="/sprite.svg#icon-logo"></use>
            </svg>
          </Link>
          <h2 className={css.title}>Давайте познайомимось ближче</h2>
          <OnboardingClient />
        </div>
        <div className={css.imageSide}>
          <img
            src={IMG_VARS.PLANT1X}
            srcSet={`${IMG_VARS.PLANT1X} 1x, ${IMG_VARS.PLANT2X} 2x`}
            alt="plant"
          />
        </div>
      </div>
    </div>
  );
}
