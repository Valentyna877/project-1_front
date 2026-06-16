import { useTheme } from '@/hooks/useTheme';
import css from './MomTipCard.module.css';

type Props = {
  momDailyTip: string | undefined;
};

export default function MomTipCard({ momDailyTip }: Props) {
  const { themeClass } = useTheme();
  return (
    <div className={`${css.momTipBox} ${css[themeClass]}`}>
      <div className={`${css.scrollContent} ${css[themeClass]}`}>
      <h2>Порада для мами</h2>
      <p className={css.momTipText}>
        {momDailyTip ? `${momDailyTip}` : 'Помилка'}
      </p>
      </div>
    </div>
  );
}
