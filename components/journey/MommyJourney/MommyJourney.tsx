import TasksReminderCard from "@/components/tasks/TasksReminderCard/TasksReminderCard";
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
      <div className={styles.main}>
        <Feelings feelings={data.feelings} />
        <ComfortTips tips={data.comfortTips} />
      </div>
      <aside className={styles.aside}>
        <TasksReminderCard />
      </aside>
    </div>
  );
};

export default MommyJourney;
