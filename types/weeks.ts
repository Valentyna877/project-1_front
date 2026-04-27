export interface BabyState {
  _id: string;
  weekNumber: number;
  analogy: string;
  babySize: number;
  babyWeight: number;
  image: string;
  imageAlt: string;
  babyActivity: string;
  babyDevelopment: string;
  interestingFact: string[];
  momDailyTips: string[];
  isPublished: boolean;
}

export interface ComfortTip {
  category: string;
  tip: string;
}

export interface MomState {
  _id: string;
  weekNumber: number;
  feelings: {
    states: string[];
    sensationDescr: string;
  };
  comfortTips: ComfortTip[];
  isPublished: boolean;
}

export interface WeekSummary {
  days: number;
  weeks: number;
  babyActivity: string;
  momDailyTips: string[];
}
