import css from "./MomTipCard.module.css";

export default function MomTipCard() {
  return (
    <div className={css.momTipBox}>
      <h2>Поррада для мами</h2>
      <p className={css.momTipText}>
        {
          "Не забувайте про зволоження шкіри живота та стегон спеціальними олійками, щоб попередити появу розтяжок."
        }
      </p>
    </div>
  );
}
