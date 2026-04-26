"use client";

import css from "./Register.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import RegistrationForm from "@/components/auth/RegistrationForm/RegistrationForm";
import Image from "next/image";
import { IMG_VARS } from "@/app/imgVars";

const Register = () => {
  const router = useRouter();

  return (
    <main>
      <RegistrationForm />
      <Image src={IMG_VARS.STORK1X} alt="logo" width={500} height={500}></Image>
    </main>
  );
};

export default Register;
