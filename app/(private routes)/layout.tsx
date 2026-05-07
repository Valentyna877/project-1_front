// interface PrivateRoutesLayoutProps {
//   children: React.ReactNode;
// }

// export default function PrivateRoutesLayout({
//   children,
// }: PrivateRoutesLayoutProps) {
//   return <>{children}</>;
// }

import { ReactNode } from 'react';
import {
  getServerAllTasks,
  getServerDiaries,
  getServerWeekInfo,
} from '@/lib/api/serverApi'; 
import { HydrationBoundary, dehydrate } from '@tanstack/react-query';
import TanStackProvider from '@/components/layout/TanStackProvider/TanStackProvider';

interface PrivateLayoutProps {
  children: ReactNode;
}

export default async function PrivateLayout({ children }: PrivateLayoutProps) {
  
  const [tasks, diaries, weeks] = await Promise.all([
    getServerAllTasks(),
    getServerDiaries(),
    getServerWeekInfo(),
  ]);

  
  const { QueryClient } = await import('@tanstack/react-query');
  const queryClient = new QueryClient();

  queryClient.setQueryData(['tasks'], tasks);
  queryClient.setQueryData(['diaries'], diaries);
  queryClient.setQueryData(['weeks'], weeks);

  const dehydratedState = dehydrate(queryClient);

  return (
    <TanStackProvider>
      <HydrationBoundary state={dehydratedState}>
        {children}
      </HydrationBoundary>
    </TanStackProvider>
import css from './layout.module.css';

interface PrivateRoutesLayoutProps {
  children: React.ReactNode;
}

export default function PrivateRoutesLayout({
  children,
}: PrivateRoutesLayoutProps) {
  return (
    <>
      <div className={css.wrapper}>{children}</div>
    </>
  );
}


// Это я пыталась ошибку обработать, но думаю, нафик это здесь))

// import { ReactNode } from "react";
// import {
//   getServerAllTasks,
//   getServerDiaries,
//   getServerWeekInfo,
// } from "@/lib/api/serverApi";
// import { HydrationBoundary, dehydrate, QueryClient } from "@tanstack/react-query";
// import TanStackProvider from "@/components/layout/TanStackProvider/TanStackProvider";
// import { GetAllTasks } from "@/types/task";
// import { DiaryEntry } from "@/types/diary";
// import { WeekInfo } from "@/types/weeks";

// interface PrivateLayoutProps {
//   children: ReactNode;
// }

// export default async function PrivateLayout({ children }: PrivateLayoutProps) {
//   let tasks: GetAllTasks[] = [];
//   let diaries: DiaryEntry[] = [];
//   let weeks: WeekInfo | null = null;

//   try {
//     tasks = await getServerAllTasks();
//   } catch (e) {
//     console.error("Tasks fetch failed:", e);
//   }

//   try {
//     diaries = await getServerDiaries();
//   } catch (e) {
//     console.error("Diaries fetch failed:", e);
//   }

//   try {
//     weeks = await getServerWeekInfo();
//   } catch (e) {
//     console.error("Weeks fetch failed:", e);
//   }

//   const queryClient = new QueryClient();
//   queryClient.setQueryData(["tasks"], tasks);
//   queryClient.setQueryData(["diaries"], diaries);
//   queryClient.setQueryData(["weeks"], weeks);

//   const dehydratedState = dehydrate(queryClient);

//   return (
//     <TanStackProvider>
//       <HydrationBoundary state={dehydratedState}>
//         {children}
//       </HydrationBoundary>
//     </TanStackProvider>
//   );
// }
