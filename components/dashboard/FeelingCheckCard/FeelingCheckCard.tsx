import Button from "@/components/common/Button/Button";
import css from "./FeelingCheckCard.module.css";

export default function FeelingCheckCard() {
  return (
    <div className={css.feelingCheckCardBox}>
      <h2>Як ви себе почуваєте?</h2>
      <p className={css.feelingSubtitle}>Рекомендація на сьогодні:</p>
      <p className={css.feelingText}>Занотуйте незвичні відчуття у тілі.</p>
      <Button className={css.feelingBtn}>Зробити запис у щоденник</Button>
      {/* <button className={css.feelingBtn} type="button"></button> */}
    </div>
  );
}
