import MultiSelect from '@/components/diary/AddDiaryEntryForm/MultiSelect';
import css from './MomTipCard.module.css';

type Props = {
  momDailyTips: string;
};

export default function MomTipCard({ momDailyTips }: Props) {
  return (
    <div className={css.momTipBox}>
      <h2>Порада для мами</h2>
      <p className={css.momTipText}>{momDailyTips}</p>
      <MultiSelect />
    </div>
  );
}
