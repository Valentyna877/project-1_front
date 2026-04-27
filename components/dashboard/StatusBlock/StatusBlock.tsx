import css from "./StatusBlock.module.css";

interface Props {
  days: number | undefined;
  weeks: number | undefined;
}

export default function StatusBlock({ days, weeks }: Props) {
  return (
    <div className={css.statusBlockBox}>
      <div className={css.statusBox}>
        <p className={css.statusTitle}>Тиждень</p>
        <p className={css.statusInfo}>{weeks}</p>
      </div>
      <div className={css.statusBox}>
        <p className={css.statusText}>Днів до зустрічі</p>
        <p className={css.statusInfo}>~{days}</p>
      </div>
    </div>
  );
}
