import { MomState } from "@/types/weeks";
import styles from "./Feelings.module.css";

interface FeelingsProps {
  feelings: MomState["feelings"];
}

const Feelings = ({ feelings }: FeelingsProps) => {
  return (
    <section className={styles.card}>
      <h3 className={styles.title}>Як ви можете почуватись</h3>

      <ul className={styles.tags}>
        {feelings.states.map((state, i) => (
          <li key={i} className={styles.tag}>
            {state}
          </li>
        ))}
      </ul>

      <p className={styles.description}>{feelings.sensationDescr}</p>
    </section>
  );
};

export default Feelings;
