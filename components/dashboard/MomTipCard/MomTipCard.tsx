import css from './MomTipCard.module.css';

type Props = {
  momDailyTips: string[] | undefined;
};

export default function MomTipCard({ momDailyTips }: Props) {
  const todayIndex = (new Date().getDay() + 6) % 7;

  const momDailyTip = momDailyTips[todayIndex];
  return (
    <div className={css.momTipBox}>
      <h2>Порада для мами</h2>
      <p className={css.momTipText}>{momDailyTip}</p>
    </div>
  );
}
