"use client";

import { useEffect, useState } from "react";
import { isAxiosError } from "axios";
import { ToastProvider } from "@/components/common/Toast/ToastProvider";
import { getBabyWeek, getMomWeek } from "@/lib/api/clientApi";
import {
  JourneyTab,
  useJourneyTabStore,
} from "@/lib/store/journeyTabStore";
import { BabyState, MomState } from "@/types/weeks";
import Tabs from "../Tabs/Tabs";
import BabyJourney from "../BabyJourney/BabyJourney";
import MommyJourney from "../MommyJourney/MommyJourney";
import Loader from "@/components/common/Loader/Loader"; 
import { useTheme } from "@/hooks/useTheme"; 
import styles from "./JourneyDetails.module.css";

const TABS: { label: string; value: JourneyTab }[] = [
  { label: "Розвиток малюка", value: "baby" },
  { label: "Тіло мами", value: "mom" },
];

interface JourneyDetailsProps {
  weekNumber: number;
}

const JourneyDetails = ({ weekNumber }: JourneyDetailsProps) => {
  const { theme } = useTheme(); 
  const activeTab = useJourneyTabStore((state) => state.activeTab);
  const setActiveTab = useJourneyTabStore((state) => state.setActiveTab);
  
  const [babyData, setBabyData] = useState<BabyState | null>(null);
  const [momData, setMomData] = useState<MomState | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState<"ok" | "missing" | "error" | "loading">("loading");

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setStatus("loading");
      
      try {
        const [baby, mom] = await Promise.all([
          getBabyWeek(weekNumber),
          getMomWeek(weekNumber),
        ]);

        setBabyData(baby);
        setMomData(mom);
        setStatus("ok");
      } catch (err) {
        const isMissing = isAxiosError(err) && err.response?.status === 404;
        
        if (isMissing) {
          setStatus("missing");
          ToastProvider.info(`Дані для тижня ${weekNumber} ще готуються`);
        } else {
          setStatus("error");
          ToastProvider.error("Не вдалося завантажити дані. Перевірте з'єднання.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [weekNumber]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let seconds = 0;

    if (isLoading) {
      interval = setInterval(() => {
        seconds += 5;
        if (seconds === 5) ToastProvider.info("Завантаження триває трохи довше...");
        if (seconds === 15) ToastProvider.warning("Перевірте стабільність інтернету.");
      }, 5000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isLoading]);

  return (
    <div className={styles.wrapper}>
      <Tabs
        tabs={TABS}
        activeTab={activeTab}
        onChange={(value) => setActiveTab(value as JourneyTab)}
      />
      
      <div className={styles.content}>
        {(isLoading || status !== "ok") && (
          <div className={styles.loaderContainer}>
            <Loader variant="global-inline" theme={theme} />
            
            <div className={styles.loaderText}>
              {status === "loading" && <p>Шукаємо інформацію...</p>}
              
              {status === "missing" && (
                <p className={styles.empty}>
                  Для тижня {weekNumber} даних поки немає. <br />
                  <span>Ми вже працюємо над цим!</span>
                </p>
              )}
              
              {status === "error" && (
                <p className={styles.error}>
                  Ой! Не вдалося завантажити дані. <br />
                  <span>Спробуйте оновити сторінку або перевірте зв&apos;язок.</span>
                </p>
              )}
            </div>
          </div>
        )}

        {!isLoading && status === "ok" && (
          <>
            {activeTab === "baby" && babyData && (
              <BabyJourney data={babyData} />
            )}

            {activeTab === "mom" && momData && (
              <MommyJourney data={momData} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default JourneyDetails;