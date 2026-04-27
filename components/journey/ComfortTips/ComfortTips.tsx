import { IconType } from "react-icons";
import {
  LuArmchair,
  LuDumbbell,
  LuLeaf,
  LuUtensils,
} from "react-icons/lu";
import { ComfortTip } from "@/types/weeks";
import styles from "./ComfortTips.module.css";

const ICON_MAP: Record<string, IconType> = {
  харчування: LuUtensils,
  активність: LuDumbbell,
  відпочинок: LuArmchair,
};

const getIcon = (category: string) =>
  ICON_MAP[category.trim().toLowerCase()] ?? LuLeaf;

interface ComfortTipsProps {
  tips: ComfortTip[];
}

const ComfortTips = ({ tips }: ComfortTipsProps) => {
  return (
    <section className={styles.card}>
      <h3 className={styles.title}>Поради для вашого комфорту</h3>
      <ul className={styles.list}>
        {tips.map((tip, i) => {
          const Icon = getIcon(tip.category);
          return (
            <li key={i} className={styles.item}>
              <Icon aria-hidden className={styles.icon} />
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
