import Image from 'next/image';
import css from './BabyTodayCard.module.css';
import Loader from '@/components/common/Loader/Loader';

type Props = {
  image: string | undefined;
  analogy: string | undefined;
  babySize: number | undefined;
  babyWeight: number | undefined;
  babyActivity: string | undefined;
  babyDevelopment: string | undefined;
  imageAlt: string | undefined;
};

export default function BabyTodayCard({
  image,
  analogy,
  babySize,
  babyWeight,
  babyActivity,
  babyDevelopment,
  imageAlt,
}: Props) {
  return (
    <div className={css.babyCardBox}>
      <h2>Малюк сьогодні</h2>
      <div className={css.babyInfoBox}>
        <Image
          className={css.babyImg}
          src={image || 'no image'}
          alt={analogy || imageAlt || 'no connection'}
          width={257}
          height={194}
        />
        <div className={css.babyTextWrapper}>
          <p className={css.babyInfo}>
            <span className={css.strong}>Розмір: </span>
            {`Приблизно ${babySize} см`}
          </p>
          <p className={css.babyInfo}>
            <span className={css.strong}>Вага: </span>
            {`Близько ${babyWeight} грамів`}
          </p>
          <p className={css.babyInfo}>
            <span className={css.strong}>Активність: </span>
            {babyActivity}
          </p>
        </div>
      </div>
      <p className={css.babyCardText}>{babyDevelopment}</p>
    </div>
  );
}
