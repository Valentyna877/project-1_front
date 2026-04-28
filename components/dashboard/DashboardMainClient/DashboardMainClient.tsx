"use client";

import css from "./DashboardMainClient.module.css";
import GreetingBlock from "@/components/common/GreetingBlock/GreetingBlock";
import FeelingCheckCard from "@/components/dashboard/FeelingCheckCard/FeelingCheckCard";
import TasksReminderCard from "@/components/tasks/TasksReminderCard/TasksReminderCard";
import DashboardCardClient from "../DashboardCardClient/DashboardCardClient";
import "@/app/globals.css";

export const DashboardMainClient = () => {
  return (
    <>
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
    </>
  );
};

export default DashboardMainClient;
