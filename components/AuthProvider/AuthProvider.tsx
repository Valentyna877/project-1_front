"use client";

import { checkSession, getUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const [isChecking, setIsCheacking] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      setError(false);
      setIsCheacking(true);

      try {
        const isAuthenticated = await checkSession();
        if (isAuthenticated) {
          const user = await getUser();
          if (user) setUser(user);
          else clearIsAuthenticated();
        }
      } catch {
        setError(true);
      } finally {
        setIsCheacking(false);
      }
    };
    fetchUser();
  }, [clearIsAuthenticated, setUser]);

  return (
    <>
      {error && <p>Error!!!</p>}
      {isChecking && <p>Loading...</p>}
      {!error && !isChecking && children}
    </>
  );
};

export default AuthProvider;
