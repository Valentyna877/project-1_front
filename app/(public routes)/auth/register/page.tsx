"use client";

import { registerUser, UserCreds } from "@/lib/api/clientApi";
import css from "./Register.module.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/lib/store/authStore";

const Register = () => {
  const router = useRouter();
  const [error, setError] = useState<Error | null>(null);
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formdata: FormData) => {
    try {
      setError(null);
      const formValues = Object.fromEntries(formdata) as unknown as UserCreds;
      console.log(formValues);

      const user = await registerUser(formValues);
      if (user) setUser(user);
      //   router.push("/profile");
    } catch (error) {
      const apiError = error as Error;
      setError(apiError);
    }
  };

  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form action={handleSubmit} className={css.form}>
        <div className={css.formGroup}>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            name="name"
            className={css.input}
            required
          />
        </div>
        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Register
          </button>
        </div>

        {error && <p className={css.error}>{`Error: ${error}`}</p>}
      </form>
    </main>
  );
};

export default Register;
