import css from './page.module.css';
import Image from 'next/image';
import { IMG_VARS } from '@/app/imgVars';
import Link from 'next/link';
import AuthHeader from '@/components/auth/AuthHeader/AuthHeader';
import ResetDataForm from '@/components/auth/ResetDataForm/ResetDataForm';
import { redirect } from 'next/navigation';
import { verifyTokenOnBackend } from '@/lib/api/clientApi';
// import { ToastProvider } from '@/components/common/Toast/ToastProvider';

const ResetData = async ({
  searchParams,
}: {
  searchParams: Promise<{ token: string }>;
}) => {
  const params = await searchParams;
  const token = params.token;
  let user;

  if (!token) {
    redirect('/');
  }

  try {
    user = await verifyTokenOnBackend(token as string);
  } catch {
    redirect('/');
  }

  return (
    <>
      <div className={css.content}>
        <div className={css['left-wrapper']}>
          <AuthHeader />
          <main className={css.section}>
            <div className="container">
              <div className={css['form-content']}>
                <h1 className={css.title}>Зміна даних</h1>
                <ResetDataForm user={user} token={token} />
                <Link href={'/profile'} className={css.redirection}>
                  Передумали? <span>Повернутися назад</span>
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

export default ResetData;
