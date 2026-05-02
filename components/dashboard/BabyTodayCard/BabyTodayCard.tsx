import Image from 'next/image';
import css from './BabyTodayCard.module.css';

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
          src={image || '/no image'}
          alt={analogy || imageAlt || 'no connection'}
          width={257}
          height={194}
        />
        <div className={css.babyTextWrapper}>
          <p className={css.babyInfo}>
            <span className={css.strong}>Розмір: </span>
            {babySize ? `Приблизно ${babySize} см` : 'Помилка'}
          </p>
          <p className={css.babyInfo}>
            <span className={css.strong}>Вага: </span>
            {babyWeight ? `Близько ${babyWeight} грамів` : 'Помилка'}
          </p>
          <p className={css.babyInfo}>
            <span className={css.strong}>Активність: </span>
            {babyActivity ? `${babyActivity}` : 'Помилка'}
          </p>
        </div>
      </div>
      <p className={css.babyCardText}>
        {babyDevelopment ? `${babyDevelopment}` : 'Помилка'}
      </p>
    </div>
  );
}
