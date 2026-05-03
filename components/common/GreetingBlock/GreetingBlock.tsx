'use client';

import css from './GreetingBlock.module.css';
import { useAuthStore } from '@/lib/store/authStore';

interface GreetingBlockProps {
  prefix?: string;
}

export default function GreetingBlock({ prefix = 'Вітаю' }: GreetingBlockProps) {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

  const name = isAuthenticated && user?.name;

  return <h1 className={css.greetingTitle}>{prefix}, {!user ? 'Мамо' : name}!</h1>;
}
