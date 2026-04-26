"use client";

import css from "./GreetingBlock.module.css";
import { useAuthStore } from "@/lib/store/authStore";

export default function GreetingBlock() {
  const user = useAuthStore((state) => state.user);

  return <h1 className={css.greetingTitle}>Вітаю, {user?.name}!</h1>;
}
