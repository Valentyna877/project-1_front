import { useAuthStore } from '@/lib/store/authStore';

export type Theme = 'boy' | 'girl' | 'default';

export function useTheme() {
  const gender = useAuthStore((s) => s.user?.gender);

  const theme: Theme =
    gender === 'boy' || gender === 'girl' ? gender : 'default';

  return {
    theme,
    themeClass: `theme-${theme}`,
  };
}
