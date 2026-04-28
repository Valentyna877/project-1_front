import { loginUser, UserLogCreds } from "@/lib/api/clientApi";
import css from "./LoginForm.module.css";
import { Formik, Form, Field, FieldProps } from "formik";
import { useId } from "react";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/store/authStore";
import Button from "@/components/common/Button/Button";
import { useRouter } from "next/navigation";

const initialValues: UserLogCreds = {
  email: "",
  password: "",
};

const formSchema = Yup.object().shape({
  email: Yup.string()
    .email("Некоректний формат електронної пошти")
    .max(64, "Пошта не може перевищувати 64 символи")
    .required("Обов'язково поле"),
  password: Yup.string()
    .min(8, "Пароль має містити мінімум 8 символів")
    .max(128, "Пароль не може перевищувати 128 символів")
    .required("Обов'язково поле"),
});

const LoginForm = () => {
  const fieldId = useId();
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const loginMutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (data) => {
      setUser(data);
      router.push("/");
    },
    onError: () => {
      console.log("має бути пуш повідомлення з помилкою");
    },
  });

  const handleSubmit = (values: UserLogCreds): void => {
    loginMutation.mutate(values);
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={formSchema}
    >
      <Form className={css.form}>
        <div className={css["field-set"]}>
          <label htmlFor={`${fieldId}-email`}></label>
          <Field name="email">
            {({ field, meta }: FieldProps) => {
              const hasError = meta.touched && meta.error;
              return (
                <>
                  <input
                    {...field}
                    type="email"
                    id={`${fieldId}-email`}
                    placeholder={"Пошта"}
                    className={`${css.input} ${hasError ? css["input-error"] : ""}`}
                  />
                  {hasError && <span className={css.span}>{meta.error}</span>}
                </>
              );
            }}
          </Field>
        </div>
        <div className={css["field-set"]}>
          <label htmlFor={`${fieldId}-password`}></label>
          <Field name="password">
            {({ field, meta }: FieldProps) => {
              const hasError = meta.touched && meta.error;
              return (
                <>
                  <input
                    {...field}
                    type="password"
                    id={`${fieldId}-password`}
                    placeholder={"Пароль"}
                    className={`${css.input} ${hasError ? css["input-error"] : ""}`}
                  />
                  {hasError && <span className={css.span}>{meta.error}</span>}
                </>
              );
            }}
          </Field>
        </div>
        <Button type="submit">Увійти</Button>
      </Form>
    </Formik>
  );
};

export default LoginForm;
