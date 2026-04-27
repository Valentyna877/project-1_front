"use client";

import css from "./DashboardMainClient.module.css";
import GreetingBlock from "@/components/common/GreetingBlock/GreetingBlock";
import FeelingCheckCard from "@/components/dashboard/FeelingCheckCard/FeelingCheckCard";
import TasksReminderCard from "@/components/dashboard/TasksReminderCard/TasksReminderCard";
import DashboardCardClient from "../DashboardCardClient/DashboardCardClient";

export const DashboardMainClient = () => {
  return (
    <>
      <div>
        <GreetingBlock />
        <div className={css.dashboardBox}>
          <div>
            <DashboardCardClient />
          </div>
          <div>
            <TasksReminderCard />
            <FeelingCheckCard />
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardMainClient;
