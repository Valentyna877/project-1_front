"use client";

import css from "./GreetingBlock.module.css";
import { useAuthStore } from "@/lib/store/authStore";

export default function GreetingBlock() {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  return (
    <h1 className={css.greetingTitle}>
      Вітаю, {isAuthenticated ? user?.name : "Мамо"}!
    </h1>
  );
}
