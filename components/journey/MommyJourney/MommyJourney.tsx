import { MomState } from "@/types/weeks";
import Feelings from "../Feelings/Feelings";
import ComfortTips from "../ComfortTips/ComfortTips";
import styles from "./MommyJourney.module.css";

interface MommyJourneyProps {
  data: MomState;
}

const MommyJourney = ({ data }: MommyJourneyProps) => {
  return (
    <div className={styles.wrapper}>
      <Feelings feelings={data.feelings} />
      <ComfortTips tips={data.comfortTips} />
    </div>
  );
};

export default MommyJourney;
