import css from "./Home.module.css";
import GreetingBlock from "@/components/common/GreetingBlock/GreetingBlock";
import BabyTodayCard from "@/components/dashboard/BabyTodayCard/BabyTodayCard";
import FeelingCheckCard from "@/components/dashboard/FeelingCheckCard/FeelingCheckCard";
import MomTipCard from "@/components/dashboard/MomTipCard/MomTipCard";
import StatusBlock from "@/components/dashboard/StatusBlock/StatusBlock";
import TasksReminderCard from "@/components/dashboard/TasksReminderCard/TasksReminderCard";
import AuthProvider from "@/components/layout/AuthProvider/AuthProvider";

const Home = async () => {
  return (
    <>
      <AuthProvider>
        <div>
          <GreetingBlock />
          <div className={css.homeBox}>
            <div>
              <StatusBlock />
              <BabyTodayCard />
              <MomTipCard />
            </div>
            <div>
              <TasksReminderCard />
              <FeelingCheckCard />
            </div>
          </div>
        </div>
      </AuthProvider>
    </>
  );
};

export default Home;
