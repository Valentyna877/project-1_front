import type { Theme } from '@/hooks/useTheme';
export type { Theme };

export type GenderValue = 'boy' | 'girl' | 'unknown';

export type GenderOption = {
  value: GenderValue;
  label: string;
};

export const genderOptions: GenderOption[] = [
  { value: 'boy', label: 'Хлопчик' },
  { value: 'girl', label: 'Дівчинка' },
  { value: 'unknown', label: 'Ще не знаю' },
];

export function genderToTheme(gender: GenderValue | null | undefined): Theme {
  if (gender === 'boy') return 'boy';
  if (gender === 'girl') return 'girl';
  return 'default';
}
