export type GreetingInterval = {
  start: number;
  end: number;  
  text: string; 
};

export const GREETING_INTERVALS: GreetingInterval[] = [
  { start: 0, end: 6, text: 'Доброї ночі' },
  { start: 6, end: 12, text: 'Доброго ранку' },
  { start: 12, end: 18, text: 'Доброго дня' },
  { start: 18, end: 24, text: 'Доброго вечора' },
];
