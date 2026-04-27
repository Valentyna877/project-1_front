"use client";

import css from "./Sidebar.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import Link from "next/link";
import { NAV_ITEMS } from "@/constants/nav";
import { NavItem } from "../NavItem/NavItem";
import UserBar from "../UserBar/UserBar";
import AuthBar from "../AuthBar/AuthBar";
import { useSidebarStore } from "@/lib/store/sidebarStore";

export default function Sidebar() {
  const { isAuthenticated } = useAuthStore();
  const { close, isOpen } = useSidebarStore();

  return (
    <aside className={`${css.sidebar} ${isOpen ? css.sidebar_open : ""}`}>
      <header className={css.sidebar_header}>
        <Link href="/" className={css.sidebar_logo_link} onClick={close}>
          <svg className={css.sidebar_logo}>
            <use href="/sprite.svg#icon-logo"></use>
          </svg>
        </Link>
        <button className={css.sidebar_close_btn} onClick={close}>
          <svg className={css.sidebar_close_icon}>
            <use href="/sprite.svg#icon-close"></use>
          </svg>
        </button>
      </header>

      <nav className={css.sidebar_nav}>
        {NAV_ITEMS.map((item) => {
          const href = isAuthenticated ? item.href : "/auth/login";

          return (
            <NavItem
              key={item.href}
              href={href}
              realHref={item.href}
              label={item.label}
              icon={item.icon}
              onClick={close}
            />
          );
        })}
      </nav>

      <div className={css.sidebar_auth_container}>
        {/* Це основа */}
        {isAuthenticated ? <UserBar /> : <AuthBar />}

        {/* Це щоб перевіряти userBars тимчасово */}
        {/* <UserBar /> */}
      </div>
    </aside>
  );
}
