export interface Baby {
  babyActivity: string;
  momDailyTips: Array<string>;
  babySize: number;
  babyWeight: number;
  image: string;
  analogy: string;
  babyDevelopment: string;
  imageAlt: string;
}

export interface WeekInfo {
  days: number;
  weeks: number;
  baby?: Baby;
}

export interface BabyState extends Baby {
  _id: string;
  weekNumber: number;
  interestingFact: string[];
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
