import Image from 'next/image';
import css from './BabyTodayCard.module.css';
import Loader from '@/components/common/Loader/Loader';

type Props = {
  image: string;
  analogy: string;
  babySize: number;
  babyWeight: number;
  babyActivity: string;
  babyDevelopment: string;
  imageAlt: string;
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
      <Loader theme="default" />
      <h2>Малюк сьогодні</h2>
      <div className={css.babyInfoBox}>
        <Image
          className={css.babyImg}
          src={image}
          alt={analogy || imageAlt}
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
