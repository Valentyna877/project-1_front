import { useSidebarStore } from "@/lib/store/sidebarStore";
import css from "./AuthBar.module.css";
import Link from "next/link";

export default function AuthBar() {
  const { close } = useSidebarStore();

  return (
    <nav className={css.authbar_nav}>
      <Link
        href="/auth/register"
        className={`${css.authbar_nav_link} ${css.authbar_nav_reg}`}
        onClick={close}
      >
        Зареєструватись
      </Link>

      <Link
        href="/auth/login"
        className={`${css.authbar_nav_link} ${css.authbar_nav_login}`}
        onClick={close}
      >
        Увійти
      </Link>
    </nav>
  );
}
