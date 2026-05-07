"use client";

import css from "./Breadcrumbs.module.css";
import { usePathname } from "next/navigation";
import { NAV_ITEMS } from "@/constants/nav";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getDiary } from "@/lib/api/clientApi";
import { DiaryEntry } from "@/types/diary";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const diaryEntryMatch = pathname.match(/^\/diary\/([^/]+)$/);
  const entryId = diaryEntryMatch?.[1];

  const { data: entry } = useQuery<DiaryEntry>({
    queryKey: ["diary", entryId],
    queryFn: () => getDiary(entryId!),
    enabled: !!entryId,
  });

  if (pathname.startsWith("/auth")) return null;

  const currentItem = NAV_ITEMS.find((item) =>
    item.href === "/" ? pathname === "/" : pathname.startsWith(item.href),
  );

  const currentLabel = currentItem?.label || "Мій день";

  return (
    <nav className="container">
      <div className={css.breadcrumbs_nav_container}>
        <Link href="/" className={css.breadcrumbs_nav_link}>
          Лелека
        </Link>
        <svg width="24" height="24" className={css.breadcrumbs_chevron_icon}>
          <use href="/sprite.svg#icon-chevron-right" />
        </svg>
        {entryId && entry ? (
          <>
            <Link href="/diary" className={css.breadcrumbs_nav_link}>
              {currentLabel}
            </Link>
            <svg width="24" height="24" className={css.breadcrumbs_chevron_icon}>
              <use href="/sprite.svg#icon-chevron-right" />
            </svg>
            <span className={css.breadcrumbs_nav_label}>{entry.title}</span>
          </>
        ) : (
          <span className={css.breadcrumbs_nav_label}>{currentLabel}</span>
        )}
      </div>
    </nav>
  );
}
