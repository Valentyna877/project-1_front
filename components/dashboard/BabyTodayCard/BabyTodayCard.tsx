import Image from 'next/image';
import css from './BabyTodayCard.module.css';
import { Baby } from '@/types/weeks';
import { useTheme } from '@/hooks/useTheme';

type Props = {
  babyInfo: Baby;
};

export default function BabyTodayCard({ babyInfo }: Props) {
  const { themeClass } = useTheme();
  return (
    <div className={`${css.babyCardBox} ${css[themeClass]}`}>
      <h2>Малюк сьогодні</h2>
      <div className={css.babyInfoBox}>
        <Image
          className={css.babyImg}
          src={babyInfo?.image ?? '/No connection. Sorry!'}
          alt={
            (babyInfo?.analogy || babyInfo?.imageAlt) ?? 'No connection. Sorry!'
          }
          width={257}
          height={194}
        />
        <div className={css.babyTextWrapper}>
          <p className={css.babyInfo}>
            <span className={css.strong}>Розмір: </span>
            Приблизно {babyInfo?.babySize} см
          </p>
          <p className={css.babyInfo}>
            <span className={css.strong}>Вага: </span>
            Близько {babyInfo?.babyWeight} грамів.
          </p>
          <p className={css.babyInfo}>
            <span className={css.strong}>Активність: </span>
            {babyInfo?.babyActivity}
          </p>
        </div>
      </div>
      <p className={css.babyCardText}>{babyInfo?.babyDevelopment}</p>
    </div>
  );
}
