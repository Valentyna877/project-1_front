"use client";

import css from "./page.module.css";
import Image from "next/image";
import { IMG_VARS } from "@/app/imgVars";
import LoginForm from "@/components/auth/LoginForm/LoginForm";
import clsx from "clsx";
import Link from "next/link";

const Register = () => {
  return (
    <main className={clsx("container", css.section)}>
      <div className={css.content}>
        <div className={css.header}>
          <svg className={css["header-logo"]}>
            <use href="/sprite.svg#icon-logo"></use>
          </svg>
        </div>
        <h1 className={css.title}>Вхід</h1>
        <LoginForm />
        <Link href={"/auth/register"} className={css.redirection}>
          Немає аккаунту? <span>Зареєструватися</span>
        </Link>
      </div>
      <Image
        className={css.img}
        src={IMG_VARS.EGGS1X}
        alt="eggs"
        width={720}
        height={900}
      ></Image>
    </main>
  );
};

export default Register;
