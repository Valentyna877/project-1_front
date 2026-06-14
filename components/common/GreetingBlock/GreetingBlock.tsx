// 'use client';

// import css from './GreetingBlock.module.css';
// import { useAuthStore } from '@/lib/store/authStore';

// type UserForTitle = {
//   name?: string | null;
//   email?: string | null;
// };

// function getGreeting(date = new Date()): string {
//   const hour = date.getHours();

//   if (hour >= 6 && hour < 12) return 'Доброго ранку';
//   if (hour >= 12 && hour < 18) return 'Доброго дня';
//   if (hour >= 18 && hour < 24) return 'Доброго вечора';

//   return 'Доброї ночі';
// }

// function PageTitle() {
//   const user = useAuthStore((state) => state.user) as UserForTitle | null;

//   const userName = user?.name || 'Мамо';

//   const greeting = `${getGreeting()}, ${userName}!`;

//   return <h1 className={css.title}>{greeting}</h1>;
// }

// export default PageTitle;

'use client';

import { useSyncExternalStore } from 'react';
import css from './GreetingBlock.module.css';
import { useAuthStore } from '@/lib/store/authStore';

type UserForTitle = {
  name?: string | null;
  email?: string | null;
};

const emptySubscribe = () => () => {};

function getGreeting(date = new Date()): string {
  const hour = date.getHours();

  if (hour >= 6 && hour < 12) return 'Доброго ранку';
  if (hour >= 12 && hour < 18) return 'Доброго дня';
  if (hour >= 18 && hour < 24) return 'Доброго вечора';

  return 'Доброї ночі';
}

function PageTitle() {
  const user = useAuthStore((state) => state.user) as UserForTitle | null;

  const isClient = useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );

  const userName = user?.name || 'Мамо';
  const greeting = isClient ? `${getGreeting()}, ${userName}!` : '';

  return <h1 className={css.title}>{greeting}</h1>;
}

export default PageTitle;
