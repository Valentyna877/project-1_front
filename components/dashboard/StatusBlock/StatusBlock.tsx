import css from "./StatusBlock.module.css";

export default async function StatusBlock() {
  return (
    <div className={css.statusBlockBox}>
      <div className={css.statusBox}>
        <p className={css.statusTitle}>Тиждень</p>
        <p className={css.statusInfo}>{"14"}</p>
      </div>
      <div className={css.statusBox}>
        <p className={css.statusText}>Днів до зустрічі</p>
        <p className={css.statusInfo}>~{"165"}</p>
      </div>
    </div>
  );
}
