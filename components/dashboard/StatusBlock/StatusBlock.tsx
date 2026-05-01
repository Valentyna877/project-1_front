import css from './StatusBlock.module.css';

interface Props {
  days: number | undefined;
  weeks: number | undefined;
}

export default function StatusBlock({ days, weeks }: Props) {
  return (
    <div className={css.statusBlockBox}>
      <div className={css.statusBox}>
        <p className={css.statusTitle}>Тиждень</p>
        <p className={css.statusInfo}>{weeks ? `${weeks}` : 0}</p>
      </div>
      <div className={css.statusBox}>
        <p className={css.statusTitle}>Днів до зустрічі</p>
        <p className={css.statusInfo}>~{days ? `${days}` : 0}</p>
      </div>
    </div>
  );
}
