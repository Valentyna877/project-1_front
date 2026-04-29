"use client";

import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { getBabyWeek, getMomWeek } from "@/lib/api/clientApi";
import {
  JourneyTab,
  useJourneyTabStore,
} from "@/lib/store/journeyTabStore";
import { BabyState, MomState } from "@/types/weeks";
import Tabs from "../Tabs/Tabs";
import BabyJourney from "../BabyJourney/BabyJourney";
import MommyJourney from "../MommyJourney/MommyJourney";
import styles from "./JourneyDetails.module.css";

const TABS: { label: string; value: JourneyTab }[] = [
  { label: "Розвиток малюка", value: "baby" },
  { label: "Тіло мами", value: "mom" },
];

interface JourneyDetailsProps {
  weekNumber: number;
}

const JourneyDetails = ({ weekNumber }: JourneyDetailsProps) => {
  const activeTab = useJourneyTabStore((state) => state.activeTab);
  const setActiveTab = useJourneyTabStore((state) => state.setActiveTab);
  const [babyData, setBabyData] = useState<BabyState | null>(null);
  const [momData, setMomData] = useState<MomState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<"ok" | "missing" | "error">("ok");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setStatus("ok");
      try {
        const [baby, mom] = await Promise.all([
          getBabyWeek(weekNumber),
          getMomWeek(weekNumber),
        ]);
        setBabyData(baby);
        setMomData(mom);
      } catch (err) {
        const isMissing =
          isAxiosError(err) && err.response?.status === 404;
        setStatus(isMissing ? "missing" : "error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [weekNumber]);

  return (
    <div className={styles.wrapper}>
      <Tabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={(value) => setActiveTab(value as JourneyTab)}
      />
      <div className={styles.content}>
        {isLoading && <p className={styles.loader}>Завантаження…</p>}
        {!isLoading && status === "missing" && (
          <p className={styles.empty}>
            Для тижня {weekNumber} даних поки немає.
          </p>
        )}
        {!isLoading && status === "error" && (
          <p className={styles.error}>Не вдалося завантажити дані тижня</p>
        )}
        {!isLoading && status === "ok" && activeTab === "baby" && babyData && (
          <BabyJourney data={babyData} />
        )}
        {!isLoading && status === "ok" && activeTab === "mom" && momData && (
          <MommyJourney data={momData} />
        )}
      </div>
    </div>
  );
};

export default JourneyDetails;
