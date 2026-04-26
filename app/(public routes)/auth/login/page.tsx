"use client";

import css from "./Login.module.css";
import { useRouter } from "next/navigation";
import RegistrationForm from "@/components/auth/RegistrationForm/RegistrationForm";
import Image from "next/image";
import { IMG_VARS } from "@/app/imgVars";
import LoginForm from "@/components/auth/LoginForm/LoginForm";

const Register = () => {
  const router = useRouter();

  return (
    <main>
      <LoginForm />
      <Image src={IMG_VARS.EGGS1X} alt="logo" width={500} height={500}></Image>
    </main>
  );
};

export default Register;
