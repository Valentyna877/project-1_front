"use client";

import "@/app/globals.css";
import css from "./Register.module.css";
import RegistrationForm from "@/components/auth/RegistrationForm/RegistrationForm";
import Image from "next/image";
import { IMG_VARS } from "@/app/imgVars";
import clsx from "clsx";
import Link from "next/link";

const Register = () => {
  return (
    <main className={clsx("container", css.section)}>
      <div className={css.content}>
        <h1 className={css.title}>Реєстрація</h1>
        <RegistrationForm />
      </div>
      <Image
        className={css.img}
        src={IMG_VARS.STORK1X}
        alt="logo"
        width={500}
        height={500}
      ></Image>
      <Link href={"/app/auth/login"} className={css.redirection}>
        Вже маєте аккаунт? <span>Увійти</span>
      </Link>
    </main>
  );
};

export default Register;
