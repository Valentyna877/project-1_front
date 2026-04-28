"use client";

import { User } from "@/types/user";
import styles from "./ProfileEditForm.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { useId, useMemo } from "react";
import { ErrorMessage, Field, Form, Formik, FormikHelpers } from "formik";
import Button from "@/components/common/Button/Button";
import CalendarDatePicker from "@/components/common/CalendarDatePicker/CalendarDatePicker";
import GenderSelect from "@/components/common/GenderSelect/GenderSelect";
import { FORTY_WEEKS, profileSchema } from "./ProfileValidationSchema";
import { useRouter } from "next/navigation";
import { nextServer } from "@/lib/api/api";
import { getUser } from "@/lib/api/clientApi";
import { toast } from "sonner";

interface ProfileEditFormProps {
  user: User;
}

interface ProfileEditFormValues {
  email: string;
  name: string;
  gender?: string | null;
  dueDate?: string;
}

export default function ProfileEditForm({ user }: ProfileEditFormProps) {
  const fieldId = useId();
  const setUser = useAuthStore((state) => state.setUser);

  const initialValues: ProfileEditFormValues = {
    name: user.name,
    email: user.email,
    gender: user.gender,
    dueDate: user.dueDate ?? "",
  };
  const router = useRouter();
  //   const today = new Date();
  //   const maxDate = new Date(Date.now() + FORTY_WEEKS);
  const today = useMemo(() => new Date(), []);
  const maxDate = useMemo(
    () => new Date(today.getTime() + FORTY_WEEKS),
    [today],
  );
  const handleSubmit = async (
    values: ProfileEditFormValues,
    actions: FormikHelpers<ProfileEditFormValues>,
  ) => {
    try {
      await nextServer.patch("/users/me", {
        gender: values.gender === "unknown" ? null : values.gender,
        date: values.dueDate,
      });
      const updateUser = await getUser();
      setUser(updateUser);
      actions.resetForm();
      router.push("/");
    } catch {
      toast.error("Щось пішло не так. Спробуйте ще раз.");
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={profileSchema}
      onSubmit={handleSubmit}
      enableReinitialize
    >
      {({ resetForm }) => (
        <Form className={styles.form}>
          <div className={styles.field}>
            <label htmlFor={`${fieldId}-name`} className={styles.label}>
              Ім&apos;я
            </label>
            <Field
              type="text"
              name="name"
              id={`${fieldId}-name`}
              placeholder={user.name}
              className={styles.input}
            />
            <ErrorMessage
              name="name"
              component="span"
              className={styles.error}
            />
          </div>

          <div className={styles.field}>
            <label htmlFor={`${fieldId}-email`} className={styles.label}>
              Пошта
            </label>
            <Field
              type="email"
              name="email"
              id={`${fieldId}-email`}
              placeholder={user.email}
              className={styles.input}
            />
            <ErrorMessage
              name="email"
              component="span"
              className={styles.error}
            />
          </div>

          <GenderSelect />
          <ErrorMessage name="gender" component="p" />
          <CalendarDatePicker minDate={today} maxDate={maxDate} />
          <ErrorMessage name="dueDate" component="p" />
          <Button type="button" onClick={() => resetForm()}>
            Відмінити зміни
          </Button>
          <Button type="submit">Зберегти зміни</Button>
        </Form>
      )}
    </Formik>
  );
}
