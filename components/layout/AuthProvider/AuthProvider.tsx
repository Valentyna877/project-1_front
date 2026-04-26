"use client";

import { checkSession, getUser, logoutUser } from "@/lib/api/clientApi";
import { useAuthStore } from "@/lib/store/authStore";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore(
    (state) => state.clearIsAuthenticated,
  );

  const [isChecking, setIsChecking] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      setIsChecking(true);

      try {
        const isAuthenticated = await checkSession();

        if (isAuthenticated) {
          const user = await getUser();
          if (user) {
            setUser(user);
          } else {
            throw new Error("Користувач не знайдений");
          }
        } else {
          throw new Error("Треба залогінитись");
        }
      } catch {
        console.log("Тут має бути пуш повідомлення про помилку");

        await logoutUser();
        clearIsAuthenticated();

        router.push("/auth/login");
      } finally {
        setIsChecking(false);
      }
    };
    fetchUser();
  }, [clearIsAuthenticated, router, setUser]);

  return (
    <>
      {isChecking && <p>Loading...</p>}
      {!isChecking && children}
    </>
  );
};

export default AuthProvider;
