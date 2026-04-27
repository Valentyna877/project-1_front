"use client";

import css from "./Header.module.css";
import Link from "next/link";
import { useSidebarStore } from "@/lib/store/sidebarStore";

export default function Header() {
  const { open, close, isOpen } = useSidebarStore();

  return (
    <>
      <header className={css.header}>
        <div className="container">
          <div className={css.header_container}>
            <Link href="/" className={css.header_logo_link}>
              <svg className={css.header_logo}>
                <use href="/sprite.svg#icon-logo"></use>
              </svg>
            </Link>
            <button className={css.burger_btn} onClick={open}>
              <svg className={css.burger_icon}>
                <use href="/sprite.svg#icon-menu"></use>
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className={css.burger_menu_overlay} onClick={close}></div>
      )}
    </>
  );
}
