import Button from "@/components/common/Button/Button";
import css from "./FeelingCheckCard.module.css";
import { redirect } from "next/navigation";

export default function FeelingCheckCard() {
  const DairyRedirect = () => {
    redirect("/dairy");
  };

  return (
    <div className={css.feelingCheckCardBox}>
      <h2>Як ви себе почуваєте?</h2>
      <p className={css.feelingSubtitle}>Рекомендація на сьогодні:</p>
      <p className={css.feelingText}>Занотуйте незвичні відчуття у тілі.</p>
      <Button className={css.feelingBtn} onClick={DairyRedirect}>
        Зробити запис у щоденник
      </Button>
    </div>
  );
}
