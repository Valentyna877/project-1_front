import { GREETING_INTERVALS } from '@/constants/time';

export function getGreeting(date = new Date()): string {
  const hour = date.getHours();
  const interval = GREETING_INTERVALS.find(
    (i) => hour >= i.start && hour < i.end
  );
  return interval ? interval.text : 'Вітаю';
}
