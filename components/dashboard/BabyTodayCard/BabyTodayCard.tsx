import Image from "next/image";
import css from "./BabyTodayCard.module.css";

export default function BabyTodayCard() {
  return (
    <div className={css.babyCardBox}>
      <h2>Малюк сьогодні</h2>
      <div className={css.babyInfoBox}>
        <Image
          className={css.babyImg}
          src={
            "https://res.cloudinary.com/dxfmtmmae/image/upload/v1777120612/plant1x_of08zu.avif"
          }
          alt="123"
          width={257}
          height={194}
        />
        <div className={css.babyTextWrapper}>
          <p className={css.babyInfo}>
            <span className={css.strong}>Розмір: </span>
            {"Приблизно 12 см"}
          </p>
          <p className={css.babyInfo}>
            <span className={css.strong}>Вага: </span>
            {"Близько 45 грамів"}
          </p>
          <p className={css.babyInfo}>
            <span className={css.strong}>Активність: </span>
            {
              "М'язи обличчя вже працюють! Малюк вчиться хмуритися, мружитись і навіть може зловити гикавку."
            }
          </p>
        </div>
      </div>
      <p className={css.babyCardText}>
        У цей час тіло малюка починає вкриватися лануго — надзвичайно ніжним
        пушком, який зберігатиме тепло. Його шийка стає міцнішою, а рухи — все
        більш скоординованими. Хоч ви ще не відчуваєте цих кульбітів, знайте:
        всередині вас відбувається справжнє диво!
      </p>
    </div>
  );
}
