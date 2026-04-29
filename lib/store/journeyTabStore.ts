import { create } from "zustand";

export type JourneyTab = "baby" | "mom";

interface JourneyTabStore {
  activeTab: JourneyTab;
  setActiveTab: (tab: JourneyTab) => void;
}

export const useJourneyTabStore = create<JourneyTabStore>((set) => ({
  activeTab: "baby",
  setActiveTab: (tab) => set({ activeTab: tab }),
}));
