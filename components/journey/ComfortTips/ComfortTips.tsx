import { ComfortTip } from "@/types/weeks";
import styles from "./ComfortTips.module.css";

const ICON_ID: Record<string, string> = {
  харчування: "icon-fork_spoon",
  активність: "icon-fitness_center",
  відпочинок: "icon-chair",
};

const getIconId = (category: string) =>
  ICON_ID[category.trim().toLowerCase()];

interface ComfortTipsProps {
  tips: ComfortTip[];
}

const ComfortTips = ({ tips }: ComfortTipsProps) => {
  return (
    <section className={styles.card}>
      <h3 className={styles.title}>Поради для вашого комфорту</h3>
      <ul className={styles.list}>
        {tips.map((tip, i) => {
          const iconId = getIconId(tip.category);
          return (
            <li key={i} className={styles.item}>
              {iconId && (
                <svg className={styles.icon} aria-hidden width={24} height={24}>
                  <use href={`/sprite.svg#${iconId}`} />
                </svg>
              )}
              <div className={styles.body}>
                <span className={styles.category}>{tip.category}</span>
                <p className={styles.tip}>{tip.tip}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default ComfortTips;
