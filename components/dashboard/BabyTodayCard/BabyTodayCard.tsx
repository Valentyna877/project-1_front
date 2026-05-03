import Image from 'next/image';
import css from './BabyTodayCard.module.css';
import { Baby } from '@/types/weeks';
import Loader from '@/components/common/Loader/Loader';

type Props = {
  babyInfo: Baby;
};

export default function BabyTodayCard({ babyInfo }: Props) {
  return (
    <div className={css.babyCardBox}>
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
            {babyInfo?.babySize}
          </p>
          <p className={css.babyInfo}>
            <span className={css.strong}>Вага: </span>
            {babyInfo?.babyWeight}
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
