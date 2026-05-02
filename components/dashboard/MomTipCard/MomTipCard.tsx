import css from './MomTipCard.module.css';

type Props = {
  momDailyTip: string | undefined;
};

export default function MomTipCard({ momDailyTip }: Props) {
  return (
    <div className={css.momTipBox}>
      <h2>Порада для мами</h2>
      <p className={css.momTipText}>
        {momDailyTip ? `${momDailyTip}` : 'Помилка'}
      </p>
    </div>
  );
}
