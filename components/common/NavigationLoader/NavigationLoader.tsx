'use client';

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Loader from '@/components/common/Loader/Loader';
import { useTheme } from '@/hooks/useTheme';

export default function NavigationLoader() {
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const showTimer = setTimeout(() => setIsLoading(true), 200);
    const hideTimer = setTimeout(() => {
      clearTimeout(showTimer);
      setIsLoading(false);
    }, 700);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
  }, [pathname]);

  if (!isLoading) return null;

  return <Loader variant="global" theme={theme} />;
}
