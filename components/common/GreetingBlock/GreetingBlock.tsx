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

// 'use client';

// import { useSyncExternalStore } from 'react';
// import css from './GreetingBlock.module.css';
// import { useAuthStore } from '@/lib/store/authStore';

// type UserForTitle = {
//   name?: string | null;
//   email?: string | null;
// };

// const emptySubscribe = () => () => {};

// function getGreeting(date = new Date()): string {
//   const hour = date.getHours();

//   if (hour >= 6 && hour < 12) return 'Доброго ранку';
//   if (hour >= 12 && hour < 18) return 'Доброго дня';
//   if (hour >= 18 && hour < 24) return 'Доброго вечора';

//   return 'Доброї ночі';
// }

// function PageTitle() {
//   const user = useAuthStore((state) => state.user) as UserForTitle | null;

//   const isClient = useSyncExternalStore(
//     emptySubscribe,
//     () => true,
//     () => false,
//   );

//   const userName = user?.name || 'Мамо';
//   const greeting = isClient ? `${getGreeting()}, ${userName}!` : '';

//   return <h1 className={css.title}>{greeting}</h1>;
// }

// export default PageTitle;


// 'use client';

// import { useEffect, useState } from 'react';
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

//   const [greeting, setGreeting] = useState('');

//   useEffect(() => {
//     const updateGreeting = () => {
//       setGreeting(`${getGreeting()}, ${userName}!`);
//     };

//     updateGreeting();

//     const now = new Date();
//     const nextChangeHour =
//       now.getHours() < 6 ? 6 :
//       now.getHours() < 12 ? 12 :
//       now.getHours() < 18 ? 18 : 24;

//     const nextChange = new Date(now);
//     nextChange.setHours(nextChangeHour, 0, 0, 0);

//     const msUntilNextChange = nextChange.getTime() - now.getTime();

//     const timeoutId = setTimeout(() => {
//       updateGreeting();
     
//       setInterval(updateGreeting, 6 * 60 * 60 * 1000);
//     }, msUntilNextChange);

//     return () => {
//       clearTimeout(timeoutId);
//     };
//   }, [userName]);

//   return (
//     <h1 className={css.title} suppressHydrationWarning>
//       {greeting}
//     </h1>
//   );
// }

// export default PageTitle;


'use client';

import { useEffect, useState } from 'react';
import css from './GreetingBlock.module.css';
import { useAuthStore } from '@/lib/store/authStore';
import { GREETING_INTERVALS } from '@/constants/time';

type UserForTitle = {
  name?: string | null;
  email?: string | null;
};

function getGreeting(date = new Date()): string {
  const hour = date.getHours();
  const interval = GREETING_INTERVALS.find(
    (i) => hour >= i.start && hour < i.end
  );
  return interval ? interval.text : 'Вітаю';
}

function PageTitle() {
  const user = useAuthStore((state) => state.user) as UserForTitle | null;
  const userName = user?.name || 'Мамо';

  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const updateGreeting = () => {
      setGreeting(`${getGreeting()}, ${userName}!`);
    };

    updateGreeting();

    const now = new Date();
    const currentHour = now.getHours();

    const nextInterval =
      GREETING_INTERVALS.find((i) => i.start > currentHour) || GREETING_INTERVALS[0];

    const nextChange = new Date(now);
    nextChange.setHours(nextInterval.start, 0, 0, 0);

    const msUntilNextChange = nextChange.getTime() - now.getTime();

    const timeoutId = setTimeout(() => {
      updateGreeting();
      setInterval(updateGreeting, 60 * 60 * 1000);
    }, msUntilNextChange);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [userName]);

  return (
    <h1 className={css.title} suppressHydrationWarning>
      {greeting}
    </h1>
  );
}

export default PageTitle;
