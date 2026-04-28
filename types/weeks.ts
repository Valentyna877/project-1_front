
export interface Baby {
  babyActivity: string;
  momDailyTips: Array<string>;
  babySize: number;
  babyWeight: number;
  image: string;
  analogy: string;
  babyDevelopment: string;
  imageAlt: string

}

export interface WeekInfo {
  days: number;
  weeks: number;
  baby?: Baby;
}
