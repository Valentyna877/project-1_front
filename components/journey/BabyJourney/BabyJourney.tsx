import Image from "next/image";
import { BabyState } from "@/types/weeks";
import styles from "./BabyJourney.module.css";

interface BabyJourneyProps {
  data: BabyState;
}

const BabyJourney = ({ data }: BabyJourneyProps) => {
  const [primaryFact, ...restFacts] = data.interestingFact;

  return (
    <article className={styles.card}>
      <div className={styles.imageColumn}>
        <div className={styles.imageWrapper}>
          <Image
            src={data.image}
            alt={data.imageAlt}
            fill
            sizes="(min-width: 900px) 461px, 100vw"
            className={styles.image}
          />
        </div>
        <p className={styles.caption}>
          Ваш малюк зараз розміром з {data.analogy}
        </p>
      </div>

      <div className={styles.content}>
        <p>{data.babyDevelopment}</p>
        <p>{data.babyActivity}</p>

        <div className={styles.fact}>
          <h3 className={styles.factTitle}>Цікавий факт тижня</h3>
          <p className={styles.factText}>{primaryFact}</p>
          {restFacts.length > 0 && (
            <ul className={styles.factList}>
              {restFacts.map((fact, i) => (
                <li key={i}>{fact}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </article>
  );
};

export default BabyJourney;
