'use client';

import css from './GreetingBlock.module.css';
import { useAuthStore } from '@/lib/store/authStore';

interface GreetingBlockProps {
  prefix?: string;
}

export default function GreetingBlock({ prefix = 'Вітаю' }: GreetingBlockProps) {
  const user = useAuthStore((state) => state.user);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);

function getGreeting(date = new Date()): string {
  const hour = date.getHours();

  return <h1 className={css.greetingTitle}>{prefix}, {!user ? 'Мамо' : name}!</h1>;
}

function PageTitle() {
  const user = useAuthStore((state) => state.user) as UserForTitle | null;

  const userName = user?.name || 'Мамо';

  const greeting = `${getGreeting()}, ${userName}!`;

  return <h1 className={css.title}>{greeting}</h1>;
}

export default PageTitle;
