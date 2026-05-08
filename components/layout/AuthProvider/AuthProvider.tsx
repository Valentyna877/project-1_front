'use client';

import Loader from '@/components/common/Loader/Loader';
import { useTheme } from '@/hooks/useTheme';
import { deleteCookies } from '@/lib/actions/deleteCookies';
import { checkSession, getUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const user = useAuthStore((state) => state.user);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated
  );
  const { theme } = useTheme();

  const [isChecking, setIsChecking] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      if (!user) setIsChecking(true);

      try {
        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
          const user = await getUser();

          if (user) {
            setUser(user);
          } else {
            throw new Error();
          }
        } else {
          clearIsAuthenticated();
        }
      } catch {
        await deleteCookies();
        clearIsAuthenticated();
      } finally {
        setIsChecking(false);
      }
    };
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  

  return (
    <>
      {isChecking && !user
        ? createPortal(<Loader theme={theme} />, document.body)
        : children}
    </>
  );
};

export default AuthProvider;
