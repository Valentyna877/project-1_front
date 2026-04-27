"use client";

import css from "./UserBar.module.css";
import Image from "next/image";
import { useAuthStore } from "@/lib/store/authStore";
import { useEffect } from "react";

export default function UserBar() {
  const { user, setUser } = useAuthStore();

  /* Розкоментувати, щоб тимчасово провірити юзера і побачити userBar в SideBar */
  // useEffect(() => {
  //   setUser({
  //     name: "Ганна",
  //     email: "hanna@gmail.com",
  //     avatar: "",
  //     date: new Date(),
  //     gender: "boy",
  //   });
  // }, [setUser]);

  if (!user) return null;

  return (
    <div className={css.user_bar_container}>
      <div className={css.user_bar_info}>
        <Image
          /* "/avatar.jpg" це тимчасо щоб бачити хоч якусь аватарку */
          src={user.avatar || "/avatar.jpg"}
          alt="avatar"
          width={40}
          height={40}
          className={css.avatar}
        />

        <div>
          <div className={css.userbar_username}>{user.name}</div>
          <div className={css.userbar_useremail}>{user.email}</div>
        </div>
      </div>

      {/* LOGOUT! Пізніше додати модалу для підтвердження виходу */}
      <button className={css.userbar_logout_btn}>
        <svg className={css.userbar_logout_icon} width={24} height={24}>
          <use href="/sprite.svg#icon-logout"></use>
        </svg>
      </button>
    </div>
  );
}
